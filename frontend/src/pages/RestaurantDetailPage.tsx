import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, MapPinIcon, StarIcon } from 'lucide-react';
import { ReviewSection } from '../components/ReviewSection';

export function RestaurantDetailPage({ restaurantId, onBack, userName, userAvatar, isLoggedIn, userId }: any) {
  const API_URL = 'http://fitfood.runasp.net';
  const [restaurant, setRestaurant] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/Restaurants`);
        const data = await res.json();
        const found = data.find((r: any) => r.id === Number(restaurantId));
        if (found) {
          setRestaurant(found);
          const revRes = await fetch(`${API_URL}/api/Reviews/restaurant/${restaurantId}`);
          if (revRes.ok) {
            const revData = await revRes.json();
            setReviews(revData.map((rev: any) => ({
              id: rev.id.toString(),
              visitorName: rev.userId === userId ? userName : (rev.userName || "Гість"),
              date: new Date(rev.createdAt || rev.CreatedAt).toLocaleDateString('uk-UA'),
              text: rev.comment || rev.Comment,
              rating: rev.rating || rev.Rating,
              avatarUrl: rev.userId === userId ? userAvatar : null
            })));
          }
        }
      } catch (e) { console.error("Помилка:", e); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, [restaurantId, userId, userName, userAvatar]);

  const handleAddReview = async (text: string, rating: number) => {
    if (!userId) { alert("Будь ласка, увійдіть!"); return; }
    
    // Включаємо User та Restaurant як null для обходу помилки валідації 400 [cite: 1]
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
      if (res.ok) window.location.reload();
      else {
        const err = await res.text();
        alert(`Помилка сервера: ${err}`);
      }
    } catch (e) { console.error(e); }
  };

  const getImg = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200";
    let fileName = url.split('/').pop() || "";
    // Виправлення помилок у назвах файлів
    fileName = fileName.replace('jng', 'jpg').replace('mcdonalds', 'macdonalds').replace('menyamusashi', 'menyanusashi');
    return `/${fileName}`; 
  };

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
        <h1 className="text-6xl font-bold text-white mb-4">{restaurant.name || restaurant.Name}</h1>
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