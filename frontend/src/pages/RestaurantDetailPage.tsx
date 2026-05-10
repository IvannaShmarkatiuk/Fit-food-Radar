import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, ArrowLeftIcon, StarIcon } from 'lucide-react';
import { ReviewSection } from '../components/ReviewSection';
import { Restaurant } from '../types'; 

export interface ExtendedReview {
  id: string;
  visitorName: string;
  date: string;
  text: string;
  avatarColor: string;
  avatarUrl?: string | null;
  rating: number;
}

interface RestaurantDetailPageProps {
  restaurantId: string;
  onBack: () => void;
  userName: string;
  userAvatar: string | null;
  isLoggedIn: boolean;
}

export function RestaurantDetailPage({ restaurantId, onBack, userName, userAvatar, isLoggedIn }: RestaurantDetailPageProps) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://fitfood.runasp.net';
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<ExtendedReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Завантаження даних з бекенду
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
       
        const res = await fetch(`${API_URL}/api/Restaurants/${restaurantId}`);
        const restaurantData = await res.json();
        setRestaurant(restaurantData);

        // Отримуємо відгуки саме для цього закладу
        const reviewsRes = await fetch(`${API_URL}/api/Reviews/restaurant/${restaurantId}`);
        const reviewsData = await reviewsRes.json();
        
  
        const mappedReviews = reviewsData.map((rev: any) => ({
          id: rev.id.toString(),
          visitorName: rev.userName || "Гість", 
          date: new Date(rev.createdAt).toLocaleDateString('uk-UA'),
          text: rev.comment,
          rating: rev.rating,
          avatarColor: 'bg-[#C45A2A]',
          avatarUrl: null
        }));
        
        setReviews(mappedReviews);
      } catch (e) {
        console.error("Помилка завантаження деталей:", e);
      } finally {
        setIsLoading(false);
      }
    };

    if (restaurantId) fetchAllData();
  }, [restaurantId, API_URL]);

 
  const currentRating = useMemo(() => {
    if (reviews.length === 0) return restaurant?.rating || 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews, restaurant]);


  const handleAddReview = async (text: string, rating: number) => {
    const reviewToSend = {
      rating: rating,
      comment: text,
      userId: 1, 
      restaurantId: parseInt(restaurantId),
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch(`${API_URL}/api/Reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewToSend)
      });

      if (res.ok) {
        
        const newReview: ExtendedReview = {
          id: Date.now().toString(),
          visitorName: userName || "Я",
          date: 'Щойно',
          text: text,
          avatarColor: 'bg-[#2E7D32]',
          avatarUrl: userAvatar,
          rating: rating
        };
        setReviews([newReview, ...reviews]);
      }
    } catch (e) {
      console.error("Не вдалося надіслати відгук:", e);
    }
  };

  if (isLoading) return <div className="text-center py-20 text-[#B8B0A0]">Завантаження смаколиків...</div>;
  if (!restaurant) return <div className="text-center py-20 text-[#B8B0A0]">Заклад не знайдено 🍕</div>;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[1440px] mx-auto pb-20">
      <div className="w-full h-[300px] relative bg-[#1A1A1A]">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2E7D32] to-[#1A1A1A]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />
        <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-[#EDE8D0] rounded-lg border border-white/10 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /><span>Назад до закладу</span>
        </button>
      </div>

      <div className="px-8 -mt-16 relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-5xl font-bold text-[#EDE8D0] tracking-tight">{restaurant.name}</h1>
              <div className="flex items-center gap-1.5 bg-[#1A1A1A] px-3 py-1.5 rounded-lg border border-[#333333] shadow-lg">
                <StarIcon className="w-5 h-5 text-[#C45A2A] fill-[#C45A2A]" />
                <span className="text-[#EDE8D0] font-bold text-lg">{currentRating}</span>
                <span className="text-[#8A8278] text-sm font-normal ml-1">({reviews.length})</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#B8B0A0] text-lg">
              <MapPinIcon className="w-5 h-5 text-[#8A8278]" /><span>{restaurant.address}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-12">
          {}
          {restaurant.categories?.map((cat: any) => (
            <span key={cat.id} className="px-4 py-1.5 bg-[#252525] text-[#EDE8D0] rounded-full border border-[#333333] font-medium">
              {cat.name}
            </span>
          )) || <span className="text-[#8A8278]">Смачна їжа</span>}
        </div>

        <ReviewSection reviews={reviews} onAddReview={handleAddReview} isLoggedIn={isLoggedIn} />
      </div>
    </motion.main>
  );
}