import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, ArrowLeftIcon, StarIcon } from 'lucide-react';
import { ReviewSection } from '../components/ReviewSection';


interface ApiRestaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  imageUrl?: string | null;
  mapImageUrl?: string | null; 
  categories?: { id: number; name: string }[];
}

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
  
  const [restaurant, setRestaurant] = useState<ApiRestaurant | null>(null);
  const [reviews, setReviews] = useState<ExtendedReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/Restaurants`);
        const allRestaurants = await res.json();
        
        const found = allRestaurants.find((r: any) => r.id === Number(restaurantId));
        
        if (found) {
          setRestaurant(found);

          const reviewsRes = await fetch(`${API_URL}/api/Reviews/restaurant/${restaurantId}`);
          if (reviewsRes.ok) {
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
          }
        }
      } catch (e) {
        console.error(e);
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
      console.error(e);
    }
  };

  const getValidImageUrl = (url: string | undefined | null) => {
    if (!url) return null;
    // Якщо в полі лежить просто назва закладу (як ми бачили "Буфет"), а не посилання
    if (!url.startsWith('http') && !url.startsWith('/')) return null;
    return url;
  };

  if (isLoading) return <div className="text-center py-20 text-[#B8B0A0]">Завантаження смаколиків...</div>;
  if (!restaurant) return <div className="text-center py-20 text-[#B8B0A0]">Заклад не знайдено 🍕</div>;

  const validMainImage = getValidImageUrl(restaurant.imageUrl);
  const validMapImage = getValidImageUrl(restaurant.mapImageUrl);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[1440px] mx-auto pb-20">
      <div className="w-full h-[400px] relative bg-[#1A1A1A]">
        {validMainImage ? (
          <img src={validMainImage} alt={restaurant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2E7D32] to-[#121212] flex items-center justify-center">
            <span className="text-[#8A8278] italic text-lg">Фото закладу незабаром</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-90" />
        <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-[#EDE8D0] rounded-lg border border-white/10 transition-colors z-20">
          <ArrowLeftIcon className="w-4 h-4" /><span>Назад до закладу</span>
        </button>
      </div>

      <div className="px-8 -mt-20 relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-6xl font-bold text-[#EDE8D0] tracking-tight">{restaurant.name}</h1>
              <div className="flex items-center gap-1.5 bg-[#1A1A1A] px-4 py-2 rounded-xl border border-[#333333] shadow-2xl">
                <StarIcon className="w-6 h-6 text-[#C45A2A] fill-[#C45A2A]" />
                <span className="text-[#EDE8D0] font-bold text-xl">{currentRating}</span>
                <span className="text-[#8A8278] text-sm font-normal ml-1">({reviews.length})</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#B8B0A0] text-xl">
              <MapPinIcon className="w-6 h-6 text-[#C45A2A]" /><span>{restaurant.address}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-12">
          {restaurant.categories?.map((cat: any) => (
            <span key={cat.id} className="px-5 py-2 bg-[#1A1A1A] text-[#EDE8D0] rounded-full border border-[#333333] font-medium text-sm uppercase tracking-wider">
              {cat.name}
            </span>
          )) || <span className="px-5 py-2 bg-[#1A1A1A] text-[#8A8278] rounded-full border border-[#333333] font-medium text-sm">FIT FOOD</span>}
        </div>

        <div className="mb-16">
          <h3 className="text-[#EDE8D0] font-bold mb-6 uppercase tracking-[0.2em] text-xs opacity-50">Локація закладу</h3>
          <div className="w-full h-[350px] rounded-3xl overflow-hidden border border-[#333333] bg-[#1A1A1A] relative shadow-2xl">
            {validMapImage ? (
              <img src={validMapImage} alt="Мапа" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <MapPinIcon className="w-12 h-12 text-[#333333]" />
                <span className="text-[#333333] font-medium">Карта завантажується...</span>
              </div>
            )}
          </div>
        </div>

        <ReviewSection reviews={reviews} onAddReview={handleAddReview} isLoggedIn={isLoggedIn} />
      </div>
    </motion.main>
  );
}