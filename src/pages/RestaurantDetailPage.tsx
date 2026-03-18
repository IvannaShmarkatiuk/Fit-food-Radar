import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, MapPinIcon, ArrowLeftIcon, StarIcon } from 'lucide-react';
import { ReviewSection, ExtendedReview } from '../components/ReviewSection';
import { mockRestaurants } from '../data/restaurants';
import { mockReviews } from '../data/reviews';

interface RestaurantDetailPageProps {
  restaurantId: string;
  onBack: () => void;
  userName: string;
  userAvatar: string | null;
  isLoggedIn: boolean;
}

export function RestaurantDetailPage({ restaurantId, onBack, userName, userAvatar, isLoggedIn }: RestaurantDetailPageProps) {
  const restaurant = mockRestaurants.find((r) => r.id === restaurantId) || mockRestaurants[0];
  const [reviews, setReviews] = useState<ExtendedReview[]>(mockReviews[restaurant.id] || []);

  const handleAddReview = (text: string) => {
    const newReview: ExtendedReview = {
      id: Date.now().toString(),
      visitorName: userName,
      date: 'Щойно',
      text: text,
      avatarColor: 'bg-[#2E7D32]',
      avatarUrl: userAvatar
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[1440px] mx-auto pb-20">
      <div className="w-full h-[300px] relative bg-[#1A1A1A]">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${restaurant.imageColor}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />
        <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-[#EDE8D0] rounded-lg border border-white/10">
          <ArrowLeftIcon className="w-4 h-4" /><span>Назад до закладів</span>
        </button>
      </div>

      <div className="px-8 -mt-16 relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-5xl font-bold text-[#EDE8D0] tracking-tight">{restaurant.name}</h1>
              <div className="flex items-center gap-1.5 bg-[#1A1A1A] px-3 py-1.5 rounded-lg border border-[#333333] shadow-lg">
                <StarIcon className="w-5 h-5 text-[#C45A2A] fill-[#C45A2A]" />
                <span className="text-[#EDE8D0] font-bold text-lg">{restaurant.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#B8B0A0] text-lg">
              <MapPinIcon className="w-5 h-5 text-[#8A8278]" /><span>{restaurant.address}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-12">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="px-4 py-1.5 bg-[#252525] text-[#EDE8D0] rounded-full border border-[#333333] font-medium">{tag}</span>
          ))}
        </div>

        <ReviewSection reviews={reviews} onAddReview={handleAddReview} isLoggedIn={isLoggedIn} />
      </div>
    </motion.main>
  );
}