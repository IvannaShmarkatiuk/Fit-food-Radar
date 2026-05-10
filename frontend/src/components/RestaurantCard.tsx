import React from 'react';
import { StarIcon, MapPinIcon, HeartIcon } from 'lucide-react';
// УВАГА: Ми змінили імпорт типу! Тепер він береться зі спільного файлу types.ts, а не з моків.
import { Restaurant } from '../types'; 

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function RestaurantCard({ restaurant, onClick, isFavorite, onToggleFavorite }: RestaurantCardProps) {
 
  const defaultImage = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  return (
    <div onClick={onClick} className="bg-[#1A1A1A] border border-[#333333] rounded-2xl overflow-hidden cursor-pointer group hover:border-[#4A4A4A] transition-all hover:shadow-2xl hover:shadow-black/50 flex flex-col h-full relative">
      
      {}
      <div className="h-[200px] w-full relative overflow-hidden bg-[#1A1A1A]">
        <img 
          
          src={restaurant.imageUrl ? restaurant.imageUrl : defaultImage} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
         
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
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

        {}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#333333]">
          {restaurant.tags && restaurant.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-[#B8B0A0] bg-[#252525] px-2.5 py-1 rounded-md">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}