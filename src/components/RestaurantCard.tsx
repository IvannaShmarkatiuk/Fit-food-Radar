import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import { Restaurant } from '../data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (id: string) => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className="bg-[#252525] rounded-xl overflow-hidden border border-[#333333] flex flex-col h-full cursor-pointer group"
      onClick={() => onClick(restaurant.id)}
    >
      {/* Image Placeholder */}
      <div className={`h-[200px] w-full bg-gradient-to-br ${restaurant.imageColor} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#EDE8D0] group-hover:text-[#C45A2A] transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-[#1A1A1A] px-2 py-1 rounded-md border border-[#333333]">
            <StarIcon className="w-4 h-4 text-[#C45A2A] fill-[#C45A2A]" />
            <span className="text-[#EDE8D0] font-medium text-sm">
              {restaurant.rating}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 mt-2">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-[#121212] text-[#B8B0A0] rounded-full border border-[#333333]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1" />

        {/* Action Button */}
        <button
          className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#2E7D32] text-[#EDE8D0] font-medium rounded-lg border border-[#333333] hover:border-[#2E7D32] transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onClick(restaurant.id);
          }}
        >
          Переглянути відгуки
        </button>
      </div>
    </motion.div>
  );
}