import React from 'react';
import { FilterIcon } from 'lucide-react';

const CATEGORIES = [
  'Шаурма',
  'Кава',
  'Випічка',
  'Піца',
  'Фастфуд',
  'Суші',
  'Бургери',
  'Українська кухня',
  'Японська кухня',
  'Пиво та закуски'
];

export function Sidebar() {
  return (
    <aside className="w-[240px] flex-shrink-0 bg-[#1A1A1A] rounded-xl border border-[#333333] p-6 h-fit sticky top-28">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#333333]">
        <FilterIcon className="w-5 h-5 text-[#C45A2A]" />
        <h2 className="text-[#EDE8D0] font-semibold text-lg">Фільтри</h2>
      </div>

      {/* Категорії */}
      <div>
        <h3 className="text-[#B8B0A0] font-medium mb-4 uppercase text-sm tracking-wider">
          Категорії
        </h3>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 border-2 border-[#333333] rounded bg-[#121212] checked:bg-[#2E7D32] checked:border-[#2E7D32] transition-colors cursor-pointer"
                />
                <svg
                  className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block left-1 top-1 text-[#EDE8D0]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-[#8A8278] group-hover:text-[#EDE8D0] transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}