import React, { useState } from 'react';
import { FilterIcon, ChevronLeft } from 'lucide-react';

const CATEGORIES = [
  'Шаурма', 'Кава', 'Випічка', 'Перекус', 'Фастфуд', 'Бургери', 
  'Курка', 'Швидке харчування', 'Українська кухня', 'Домашні страви', 
  'Обід', 'Японська кухня', 'Суші', 'Роли', 'Напої', 'Закуски'
];

interface SidebarProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

export function Sidebar({ selectedCategories, onCategoryToggle }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`flex-shrink-0 bg-[#1A1A1A] rounded-xl border border-[#333333] sticky top-28 transition-all duration-300 max-h-[calc(100vh-120px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#333333] [&::-webkit-scrollbar-thumb]:rounded-full ${
        isOpen ? 'w-[240px] p-6' : 'w-[72px] p-4 overflow-hidden'
      }`}
    >
      <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} mb-6 pb-4 border-b border-[#333333]`}>
        {isOpen && (
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-[#C45A2A] flex-shrink-0" />
            <h2 className="text-[#EDE8D0] font-semibold text-lg whitespace-nowrap">Фільтри</h2>
          </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 hover:bg-[#252525] rounded-lg transition-colors text-[#8A8278] hover:text-[#EDE8D0] flex-shrink-0 cursor-pointer">
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <FilterIcon className="w-5 h-5 text-[#C45A2A]" />}
        </button>
      </div>

      <div className={`transition-all duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
        <h3 className="text-[#B8B0A0] font-medium mb-4 uppercase text-sm tracking-wider whitespace-nowrap">Категорії</h3>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category)}
                  className="peer appearance-none w-5 h-5 border-2 border-[#333333] rounded bg-[#121212] checked:bg-[#2E7D32] checked:border-[#2E7D32] transition-colors cursor-pointer"
                />
                <svg className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block left-1 top-1 text-[#EDE8D0]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-[#8A8278] group-hover:text-[#EDE8D0] transition-colors whitespace-nowrap">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}