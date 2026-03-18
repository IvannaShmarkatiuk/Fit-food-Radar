import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { RestaurantCard } from '../components/RestaurantCard';
import { mockRestaurants } from '../data/restaurants';

interface CatalogPageProps {
  onRestaurantClick: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  searchQuery: string;
}

export function CatalogPage({ onRestaurantClick, favorites, toggleFavorite, searchQuery }: CatalogPageProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategories = 
      selectedCategories.length === 0 || 
      restaurant.tags.some(tag => selectedCategories.includes(tag));
      
    return matchesSearch && matchesCategories;
  });

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 flex gap-8 relative items-start">
      <Sidebar 
        selectedCategories={selectedCategories} 
        onCategoryToggle={handleCategoryToggle} 
      />
      <div className="flex-1">
        {filteredRestaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#1A1A1A] rounded-2xl border border-[#333333]">
            <p className="text-2xl font-bold text-[#EDE8D0] mb-2">Нічого не знайдено 😕</p>
            <p className="text-[#8A8278]">Спробуйте змінити критерії пошуку або зняти деякі фільтри.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => onRestaurantClick(restaurant.id)}
                isFavorite={favorites.includes(restaurant.id)}
                onToggleFavorite={(e) => {
                  e.stopPropagation();
                  toggleFavorite(restaurant.id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}