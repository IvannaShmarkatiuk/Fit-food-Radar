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
  onRestaurantClick, favorites, toggleFavorite, searchQuery, restaurants, isLoading 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Всі заклади');

  // Автоматично створюємо список категорій з того, що прислав бекенд
  const dynamicCategories = useMemo(() => {
    const allNames = restaurants.flatMap(r => {
      const cats = (r as any).categories || (r as any).Categories || [];
      return cats.map((c: any) => c.name || c.Name || c);
    });
    return ['Всі заклади', ...Array.from(new Set(allNames)).filter(Boolean)] as string[];
  }, [restaurants]);

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const rName = (r.name || (r as any).Name || "").toLowerCase();
      const matchesSearch = rName.includes(searchQuery.toLowerCase());
      
      const cats = (r as any).categories || (r as any).Categories || [];
      const matchesCategory = activeCategory === 'Всі заклади' || cats.some((c: any) => (c.name || c.Name || c) === activeCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [restaurants, searchQuery, activeCategory]);

  if (isLoading) return <div className="text-center py-20 text-[#EDE8D0]">Завантаження...</div>;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center gap-2 mb-6 text-[#C45A2A]">
            <FilterIcon size={18} />
            <h3 className="text-[#EDE8D0] font-bold uppercase tracking-widest text-xs">Категорії</h3>
          </div>
          <div className="flex flex-wrap lg:flex-col gap-1">
            {dynamicCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${activeCategory === cat ? 'bg-[#C45A2A] text-white' : 'text-[#8A8278] hover:bg-[#1A1A1A]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </aside>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map(r => (
          <RestaurantCard 
            key={r.id} 
            restaurant={r} 
            onClick={() => onRestaurantClick(r.id.toString())} 
            isFavorite={favorites.includes(r.id.toString())} 
            onToggleFavorite={() => toggleFavorite(r.id.toString())} 
          />
        ))}
      </div>
    </main>
  );
};