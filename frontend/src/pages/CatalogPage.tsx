import React from 'react';
import { Restaurant } from '../types';
import { RestaurantCard } from '../components/RestaurantCard';

interface CatalogPageProps {
  onRestaurantClick: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  searchQuery: string;
  restaurants: Restaurant[];
  isLoading: boolean;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ 
  onRestaurantClick, 
  favorites, 
  toggleFavorite, 
  searchQuery,
  restaurants,
  isLoading 
}) => {
  const filtered = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="text-center py-20 text-[#EDE8D0]">Завантаження смачненького...</div>;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(r => (
          <RestaurantCard 
            key={r.id} 
            // Передаємо дані, перетворюючи ID на рядок для сумісності з компонентом
            restaurant={{
              ...r,
              id: r.id.toString() as any // Обманюємо старий тип для сумісності
            }} 
            onClick={() => onRestaurantClick(r.id.toString())} 
            isFavorite={favorites.includes(r.id.toString())} 
            onToggleFavorite={(e) => { 
              e.stopPropagation(); 
              toggleFavorite(r.id.toString()); 
            }} 
          />
        ))}
      </div>
    </main>
  );
};