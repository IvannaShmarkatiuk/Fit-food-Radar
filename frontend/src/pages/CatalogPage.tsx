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

  const categories = useMemo(() => {
    const all = restaurants.flatMap(r => {
      const c = (r as any).categories || (r as any).Categories || [];
      return c.map((item: any) => item.name || item.Name || item);
    });
    return ['Всі заклади', ...Array.from(new Set(all))];
  }, [restaurants]);

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const rName = (r.name || (r as any).Name || "").toLowerCase();
      const matchesSearch = rName.includes(searchQuery.toLowerCase());
      const cats = (r as any).categories || (r as any).Categories || [];
      const matchesCat = activeCategory === 'Всі заклади' || cats.some((c: any) => (c.name || c.Name || c) === activeCategory);
      return matchesSearch && matchesCat;
    });
  }, [restaurants, searchQuery, activeCategory]);

  if (isLoading) return <div className="text-center py-20 text-[#EDE8D0] animate-pulse font-medium">Шукаємо затишні місця...</div>;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center gap-2 mb-6 text-[#C45A2A]">
            <FilterIcon size={18} /> <h3 className="text-[#EDE8D0] font-bold uppercase text-[10px] tracking-widest">Категорії страв</h3>
          </div>
          <div className="flex flex-wrap lg:flex-col gap-1">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} 
                className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${activeCategory === cat ? 'bg-[#C45A2A] text-white shadow-lg' : 'text-[#8A8278] hover:bg-[#1A1A1A] hover:text-[#EDE8D0]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </aside>
      <div className="flex-grow">
        {/* items-start ВИПРАВЛЯЄ ДОВЖИНУ КАРТОК */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          {filtered.map(r => (
            <RestaurantCard key={r.id} restaurant={r} onClick={() => onRestaurantClick(r.id.toString())} isFavorite={favorites.includes(r.id.toString())} onToggleFavorite={() => toggleFavorite(r.id.toString())} />
          ))}
        </div>
      </div>
    </main>
  );
};