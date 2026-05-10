import React from 'react';
import { StarIcon, MapPinIcon, HeartIcon } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function RestaurantCard({ restaurant, onClick, isFavorite, onToggleFavorite }: RestaurantCardProps) {
  const name = restaurant.name || (restaurant as any).Name;
  const rating = restaurant.rating || (restaurant as any).Rating;
  const address = restaurant.address || (restaurant as any).Address;
  const rawImg = restaurant.imageUrl || (restaurant as any).ImageUrl;
  
  const defaultImg = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80";
  
  // Додаємо / на початок, якщо його немає
  const finalImg = rawImg 
    ? (rawImg.startsWith('http') || rawImg.startsWith('/') ? rawImg : '/' + rawImg) 
    : defaultImg;

  return (
    <div onClick={onClick} className="bg-[#1A1A1A] border border-[#333333] rounded-2xl overflow-hidden cursor-pointer group hover:border-[#4A4A4A] transition-all flex flex-col relative">
      <div className="h-[200px] w-full relative overflow-hidden bg-[#1A1A1A]">
        <img src={finalImg} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => { (e.target as HTMLImageElement).src = defaultImg; }} />
      </div>
      <button onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(e); }} className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 z-10">
        <HeartIcon className={`w-4 h-4 ${isFavorite ? 'fill-[#ef4444] text-[#ef4444]' : 'text-white'}`} />
      </button>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#EDE8D0] truncate">{name}</h3>
          <div className="flex items-center gap-1 bg-[#252525] px-2 py-0.5 rounded">
            <StarIcon size={12} className="text-[#C45A2A] fill-[#C45A2A]" />
            <span className="text-[#EDE8D0] text-sm font-bold">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[#8A8278] text-sm mb-4">
          <MapPinIcon size={14} /> <span className="truncate">{address}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-auto">
          {((restaurant as any).categories || (restaurant as any).Categories)?.map((c: any) => (
            <span key={c.id || c} className="text-[10px] uppercase font-bold text-[#C45A2A] bg-[#C45A2A]/10 px-2 py-0.5 rounded border border-[#C45A2A]/20">
              {c.name || c.Name || c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}