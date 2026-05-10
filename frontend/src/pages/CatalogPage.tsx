import React, { useState, useMemo } from 'react';
import { Restaurant } from '../types';
import { RestaurantCard } from '../components/RestaurantCard';
import { FilterIcon } from 'lucide-react';

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
  const [activeCategory, setActiveCategory] = useState<string>('Всі заклади');


  const dynamicCategories = useMemo(() => {
    const allNames = restaurants.flatMap(r => 
      (r.categories as any[])?.map(c => c.name) || []
    );
    return ['Всі заклади', ...Array.from(new Set(allNames))];
  }, [restaurants]);


  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'Всі заклади' 
        || (r.categories as any[])?.some(c => c.name === activeCategory);
        
      return matchesSearch && matchesCategory;
    });
  }, [restaurants, searchQuery, activeCategory]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-pulse">
        <div className="w-12 h-12 border-4 border-[#C45A2A] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#8A8278] font-medium">Шукаємо найкращі заклади для тебе...</p>
      </div>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
      {}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="sticky top-28 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#C45A2A]/10 rounded-lg">
                <FilterIcon className="w-4 h-4 text-[#C45A2A]" />
              </div>
              <h3 className="text-[#EDE8D0] font-bold uppercase tracking-[0.15em] text-xs">Категорії страв</h3>
            </div>
            
            <div className="flex flex-wrap lg:flex-col gap-2">
              {dynamicCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 rounded-xl transition-all duration-300 text-sm font-semibold text-left ${
                    activeCategory === cat 
                      ? 'bg-[#C45A2A] text-white shadow-lg shadow-[#C45A2A]/20 lg:translate-x-2' 
                      : 'text-[#8A8278] hover:bg-[#1A1A1A] hover:text-[#EDE8D0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-[#333333]">
            <p className="text-[11px] text-[#5A544E] leading-relaxed uppercase tracking-wider">
              Знайдено за запитом: <span className="text-[#EDE8D0]">{filtered.length} заклади</span>
            </p>
          </div>
        </div>
      </aside>

      {}
      <div className="flex-grow">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map(r => (
              <RestaurantCard 
                key={r.id} 
                restaurant={{...r, id: r.id.toString() as any}} 
                onClick={() => onRestaurantClick(r.id.toString())} 
                isFavorite={favorites.includes(r.id.toString())} 
                onToggleFavorite={(e) => { 
                  e.stopPropagation(); 
                  toggleFavorite(r.id.toString()); 
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#1A1A1A]/50 rounded-[2rem] border-2 border-dashed border-[#333333]">
            <p className="text-[#8A8278] text-lg font-medium">У цій категорії поки порожньо 🍕</p>
            <button 
              onClick={() => setActiveCategory('Всі заклади')}
              className="mt-4 text-[#C45A2A] hover:underline text-sm"
            >
              Скинути фільтр
            </button>
          </div>
        )}
      </div>
    </main>
  );
};