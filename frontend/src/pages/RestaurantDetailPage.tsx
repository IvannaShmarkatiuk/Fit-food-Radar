import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, MapPinIcon, StarIcon, HeartIcon } from 'lucide-react';
import { ReviewSection } from '../components/ReviewSection';

export function RestaurantDetailPage({ restaurantId, onBack, userName, userAvatar, isLoggedIn, userId, favorites, onToggleFavorite }: any) {
  const API_URL = 'https://fitfood-api.onrender.com';
  const [restaurant, setRestaurant] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const revRes = await fetch(`${API_URL}/api/Reviews/restaurant/${restaurantId}`);
      if (revRes.ok) {
        const revData = await revRes.json();
        setReviews(revData.map((rev: any) => ({
          id: rev.id.toString(),
          visitorName: rev.userId === userId ? userName : (rev.user?.name || "Гість"),
          date: new Date(rev.createdAt || rev.CreatedAt).toLocaleDateString('uk-UA'),
          text: rev.comment || rev.Comment,
          rating: rev.rating || rev.Rating,
          avatarUrl: rev.userId === userId ? userAvatar : (rev.user?.avatarUrl || null)
        })));
      }
    } catch (e) {
      console.error("Помилка завантаження відгуків:", e);
    }
  }, [restaurantId, userId, userName, userAvatar]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/Restaurants`);
        const data = await res.json();
        const found = data.find((r: any) => r.id === Number(restaurantId));
        if (found) {
          setRestaurant(found);
          await fetchReviews();
        }
      } catch (e) {
        console.error("Помилка:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantId, fetchReviews]);

  const handleAddReview = async (text: string, rating: number) => {
    if (!userId) { alert("Будь ласка, увійдіть!"); return; }

    const body = {
      rating,
      comment: text,
      userId,
      restaurantId: Number(restaurantId),
      createdAt: new Date().toISOString(),
      user: null,
      restaurant: null
    };

    try {
      const res = await fetch(`${API_URL}/api/Reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        
        await fetchReviews();
      } else {
        const err = await res.text();
        alert(`Помилка сервера: ${err}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getImg = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200";
    return url;
  };


  const isFavorite = favorites?.includes(restaurantId?.toString());

  if (isLoading || !restaurant) return <div className="text-center py-40 text-white font-medium">Вантажимо...</div>;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1440px] mx-auto pb-20">
      <div className="w-full h-[500px] relative bg-[#1A1A1A]">
        <img src={getImg(restaurant.imageUrl || restaurant.ImageUrl)} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] opacity-80" />
        <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg text-white z-20 backdrop-blur-md border border-white/10">
          <ArrowLeftIcon size={16} /> Назад
        </button>
      </div>

      <div className="px-8 -mt-16 relative z-10">
        <div className="flex items-center gap-6 mb-8">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            {restaurant.name || restaurant.Name}
          </h1>

          <div className="bg-[#1A1A1A] border border-[#333333] px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
            <StarIcon size={20} className="text-[#C45A2A] fill-[#C45A2A]" />
            <span className="text-white font-bold text-xl">
              {restaurant.rating || (restaurant as any).Rating || "0.0"}
            </span>
          </div>

          {}
          <button
            onClick={() => onToggleFavorite(restaurantId)}
            className="p-3 bg-[#1A1A1A] border border-[#333333] rounded-xl hover:bg-[#252525] transition-all shadow-2xl group"
          >
            <HeartIcon
              size={24}
              className={`transition-colors ${
                isFavorite
                  ? 'text-red-500 fill-red-500'
                  : 'text-[#8A8278] group-hover:text-white'
              }`}
            />
          </button>
        </div>

        <p className="flex items-center gap-2 text-[#B8B0A0] text-xl mb-12">
          <MapPinIcon className="text-[#C45A2A]" size={20} /> {restaurant.address || restaurant.Address}
        </p>

        <div className="mb-16">
          <h3 className="text-[#EDE8D0] font-bold mb-6 uppercase text-xs opacity-50 tracking-widest">Локація на карті</h3>
          <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-[#333333] bg-[#000] flex items-center justify-center">
            <img src={getImg(restaurant.mapImageUrl || restaurant.MapImageUrl)} className="max-w-full max-h-full object-contain" alt="map" />
          </div>
        </div>

        <ReviewSection reviews={reviews} onAddReview={handleAddReview} isLoggedIn={isLoggedIn} />
      </div>
    </motion.main>
  );
}
