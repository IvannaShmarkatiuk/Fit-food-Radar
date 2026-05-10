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
    <main className="max-w-[1440px] mx-auto px-8 py-12 flex gap-8">
      {/* ЛІВА ЧАСТИНА: Слайд-бар / Фільтри */}
      <aside className="w-64 flex-shrink-0 hidden lg:block">
        <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="text-[#EDE8D0] font-bold mb-4 uppercase tracking-widest text-xs opacity-50">Категорії</h3>
            <div className="space-y-2">
              {['Всі заклади', 'Сніданки', 'Обід', 'Вечеря', 'Корисне'].map(cat => (
                <button key={cat} className="block w-full text-left px-4 py-2 rounded-lg text-[#8A8278] hover:bg-[#1A1A1A] hover:text-[#EDE8D0] transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 bg-[#1A1A1A] rounded-2xl border border-[#333333]">
            <p className="text-sm text-[#8A8278]">Обирай найкращі заклади поблизу твого університету! 🎓</p>
          </div>
        </div>
      </aside>

      {/* ПРАВА ЧАСТИНА: Сітка ресторанів */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(r => (
            <RestaurantCard 
              key={r.id} 
              restaurant={{
                ...r,
                id: r.id.toString() as any 
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
      </div>
    </main>
  );
};