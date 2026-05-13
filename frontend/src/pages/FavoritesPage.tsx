import React from 'react';
import { HeartIcon } from 'lucide-react';
import { Restaurant } from '../types';
import { RestaurantCard } from '../components/RestaurantCard';

interface FavoritesPageProps {
  onRestaurantClick: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  restaurants: Restaurant[];
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onRestaurantClick,
  favorites,
  toggleFavorite,
  restaurants,
}) => {
  const favoriteRestaurants = restaurants.filter(r =>
    favorites.includes(r.id.toString())
  );

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12">
      <div className="flex items-center gap-3 mb-10">
        <HeartIcon size={28} className="text-[#C45A2A] fill-[#C45A2A]" />
        <h1 className="text-3xl font-bold text-[#EDE8D0]">Улюблені заклади</h1>
      </div>

      {favoriteRestaurants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <HeartIcon size={56} className="text-[#333333]" />
          <p className="text-[#8A8278] text-xl">Ви ще не додали жодного закладу</p>
          <p className="text-[#4A4A4A] text-sm">Натисніть на сердечко на картці закладу, щоб зберегти його тут</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          {favoriteRestaurants.map(r => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onClick={() => onRestaurantClick(r.id.toString())}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(r.id.toString())}
            />
          ))}
        </div>
      )}
    </main>
  );
};
