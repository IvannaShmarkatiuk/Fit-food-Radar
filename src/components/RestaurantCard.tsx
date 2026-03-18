import React from 'react';
import { StarIcon, MapPinIcon, HeartIcon } from 'lucide-react';
import { Restaurant } from '../data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function RestaurantCard({ restaurant, onClick, isFavorite, onToggleFavorite }: RestaurantCardProps) {
  return (
    <div onClick={onClick} className="bg-[#1A1A1A] border border-[#333333] rounded-2xl overflow-hidden cursor-pointer group hover:border-[#4A4A4A] transition-all hover:shadow-2xl hover:shadow-black/50 flex flex-col h-full relative">
      <div className="h-[200px] w-full relative overflow-hidden bg-[#1A1A1A]">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${restaurant.imageColor}`} />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {onToggleFavorite && (
        <button
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 z-10 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all border border-white/10 group/btn"
          title="Додати в улюблені"
        >
          <HeartIcon className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#ef4444] text-[#ef4444]' : 'text-white group-hover/btn:text-[#ef4444]'}`} />
        </button>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#EDE8D0] group-hover:text-[#C45A2A] transition-colors line-clamp-1">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-[#252525] px-2 py-1 rounded-md">
            <StarIcon className="w-4 h-4 text-[#C45A2A] fill-[#C45A2A]" />
            <span className="text-[#EDE8D0] font-medium text-sm">{restaurant.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#8A8278] mb-4 text-sm">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{restaurant.address}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#333333]">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-[#B8B0A0] bg-[#252525] px-2.5 py-1 rounded-md">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}