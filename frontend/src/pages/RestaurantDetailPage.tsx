import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, ArrowLeftIcon, StarIcon } from 'lucide-react';
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
              visitorName: rev.userName || rev.UserName || "Гість",
              date: new Date(rev.createdAt || rev.CreatedAt).toLocaleDateString('uk-UA'),
              text: rev.comment || rev.Comment,
              rating: rev.rating || rev.Rating,
              avatarColor: 'bg-[#C45A2A]',
              avatarUrl: rev.userAvatar || rev.UserAvatar || null
            })));
          }
        }
      } finally { setIsLoading(false); }
    };
    fetchData();
  }, [restaurantId, API_URL]);

  const handleAddReview = async (text: string, rating: number) => {
    // Відправляємо назви полів з ВЕЛИКОЇ літери (PascalCase) для .NET бекенду
    const body = { Rating: rating, Comment: text, UserId: 1, RestaurantId: Number(restaurantId), CreatedAt: new Date().toISOString() };
    try {
      const res = await fetch(`${API_URL}/api/Reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) window.location.reload();
      else alert("Помилка при додаванні відгуку. Перевірте консоль.");
    } catch (e) { console.error(e); }
  };

  if (isLoading) return <div className="text-center py-20 text-[#B8B0A0]">Завантаження...</div>;
  if (!restaurant) return <div className="text-center py-20 text-[#B8B0A0]">Заклад не знайдено</div>;

  const img = restaurant.imageUrl || restaurant.ImageUrl;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1440px] mx-auto pb-20">
      <div className="w-full h-[400px] relative bg-[#1A1A1A]">
        <img src={img && (img.startsWith('/') || img.startsWith('http')) ? img : "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200"} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-90" />
        <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md text-[#EDE8D0] rounded-lg border border-white/10 z-20">
          <ArrowLeftIcon size={16} /><span>Назад</span>
        </button>
      </div>
      <div className="px-8 -mt-20 relative z-10">
        <h1 className="text-6xl font-bold text-[#EDE8D0] mb-4">{restaurant.name || restaurant.Name}</h1>
        <div className="flex items-center gap-2 text-[#B8B0A0] text-xl mb-12">
          <MapPinIcon size={24} className="text-[#C45A2A]" /><span>{restaurant.address || restaurant.Address}</span>
        </div>
        <ReviewSection reviews={reviews} onAddReview={handleAddReview} isLoggedIn={isLoggedIn} />
      </div>
    </motion.main>
  );
}