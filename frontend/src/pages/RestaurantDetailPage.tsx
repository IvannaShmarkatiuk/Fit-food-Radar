import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, MapPinIcon, StarIcon } from 'lucide-react';
import { ReviewSection } from '../components/ReviewSection';

export function RestaurantDetailPage({ restaurantId, onBack, userName, userAvatar, isLoggedIn }: any) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://fitfood.runasp.net';
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
              visitorName: rev.userId === 1 ? userName : (rev.userName || rev.UserName || "Гість"),
              date: new Date(rev.createdAt || rev.CreatedAt).toLocaleDateString('uk-UA'),
              text: rev.comment || rev.Comment,
              rating: rev.rating || rev.Rating,
              avatarUrl: rev.userId === 1 ? userAvatar : (rev.userAvatar || rev.UserAvatar || null)
            })));
          }
        }
      } catch (e) { console.error(e); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, [restaurantId, API_URL, userName, userAvatar]);

  const handleAddReview = async (text: string, rating: number) => {
    const body = {
      rating: rating,
      comment: text,
      userId: 1, 
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
        const errorText = await res.text();
        alert(`Помилка сервера: ${errorText}`);
      }
    } catch (e) { console.error(e); }
  };

  const getImg = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200";
    if (url.startsWith('http')) return url;
    return `/${url.split('/').pop()}`; 
  };

  const currentRating = useMemo(() => {
    if (reviews.length === 0) return restaurant?.rating || (restaurant as any)?.Rating || 0;
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews, restaurant]);

  if (isLoading || !restaurant) return <div className="text-center py-40 text-white font-medium">Вантажимо затишок...</div>;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1440px] mx-auto pb-20">
      {/* ВИПРАВЛЕНО: h-[350px] -> h-[500px] (Головна рамка) */}
      <div className="w-full h-[500px] relative bg-[#1A1A1A]">
        <img src={getImg(restaurant.imageUrl || restaurant.ImageUrl)} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] opacity-80" />
        <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg text-white z-20 backdrop-blur-md border border-white/10 transition-all hover:bg-black/60">
          <ArrowLeftIcon size={16} /> Назад
        </button>
      </div>

      <div className="px-8 -mt-16 relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <h1 className="text-6xl font-bold text-white tracking-tight">{restaurant.name || restaurant.Name}</h1>
          <div className="bg-[#1A1A1A] border border-[#333333] px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
             <StarIcon size={20} className="text-[#C45A2A] fill-[#C45A2A]" />
             <span className="text-white font-bold text-xl">{currentRating}</span>
          </div>
        </div>
        <p className="flex items-center gap-2 text-[#B8B0A0] text-xl mb-12 italic">
          <MapPinIcon className="text-[#C45A2A]" size={20} /> {restaurant.address || restaurant.Address}
        </p>

        {/* МАПА - Збільшено рамку h-[400px] -> h-[450px] */}
        <div className="mb-16">
          <h3 className="text-[#EDE8D0] font-bold mb-6 uppercase text-xs opacity-50 tracking-widest">Локація на карті</h3>
          <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-[#333333] shadow-2xl">
            <img 
              src={getImg(restaurant.mapImageUrl || restaurant.MapImageUrl)} 
              className="w-full h-full object-cover" 
              alt="map" 
              onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x600?text=Map+Loading..."; }} 
            />
          </div>
        </div>

        <ReviewSection reviews={reviews} onAddReview={handleAddReview} isLoggedIn={isLoggedIn} />
      </div>
    </motion.main>
  );
}