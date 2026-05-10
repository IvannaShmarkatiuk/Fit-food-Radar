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
            // МАПІНГ: Використовуємо userName з пропсів, якщо ID юзера збігається (userId: 1 - це ти)
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
    // ВАЖЛИВО: Додаємо User та Restaurant як null, щоб .NET бекенд не видавав помилку 400
    const body = {
      rating: rating,
      comment: text,
      userId: 1, 
      restaurantId: Number(restaurantId),
      createdAt: new Date().toISOString(),
      user: null,       // ЦЕ ВИПРАВИТЬ ПОМИЛКУ 400
      restaurant: null  // ЦЕ ВИПРАВИТЬ ПОМИЛКУ 400
    };

    try {
      const res = await fetch(`${API_URL}/api/Reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const errorText = await res.text();
        alert(`Помилка: ${errorText}`);
      }
    } catch (e) { console.error(e); }
  };

  const currentRating = useMemo(() => {
    if (reviews.length === 0) return restaurant?.rating || (restaurant as any)?.Rating || 0;
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews, restaurant]);

  if (isLoading || !restaurant) return <div className="text-center py-40 text-white">Вантажимо...</div>;

  const rawImg = restaurant.imageUrl || restaurant.ImageUrl;
  const img = rawImg ? (rawImg.startsWith('http') || rawImg.startsWith('/') ? rawImg : '/' + rawImg) : "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200";

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1440px] mx-auto pb-20">
      <div className="w-full h-[350px] relative bg-[#1A1A1A]">
        <img src={img} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] opacity-90" />
        <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg text-white z-20 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all">
          <ArrowLeftIcon size={16} /> Назад
        </button>
      </div>
      <div className="px-8 -mt-16 relative z-10">
        <div className="flex items-center gap-6 mb-4">
          <h1 className="text-6xl font-bold text-white tracking-tight">{restaurant.name || restaurant.Name}</h1>
          <div className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#333333] px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
             <StarIcon size={20} className="text-[#C45A2A] fill-[#C45A2A]" />
             <span className="text-white font-bold text-xl">{currentRating}</span>
          </div>
        </div>
        <p className="flex items-center gap-2 text-[#B8B0A0] text-xl mb-12">
          <MapPinIcon className="text-[#C45A2A]" size={20} /> {restaurant.address || restaurant.Address}
        </p>
        <ReviewSection reviews={reviews} onAddReview={handleAddReview} isLoggedIn={isLoggedIn} />
      </div>
    </motion.main>
  );
}