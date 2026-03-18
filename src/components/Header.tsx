import React, { Component } from 'react';
import { SearchIcon, UserIcon } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onLogoClick: () => void;
}

export function Header({ onLoginClick, onLogoClick }: HeaderProps) {
  return (
    <header className="w-full bg-[#1A1A1A] border-b border-[#333333] sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
          aria-label="На головну"
        >
          <img
            src="/Component_1.png"
            alt="Логотип Де поїсти ФІТ"
            className="h-12 w-12 object-contain rounded-full bg-[#EDE8D0]"
          />
          <span className="text-[#EDE8D0] font-bold text-xl hidden md:block tracking-wide">
            Де поїсти ФІТ?
          </span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-[500px] mx-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-[#8A8278] group-focus-within:text-[#C45A2A] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-[#121212] border border-[#333333] rounded-lg text-[#EDE8D0] placeholder-[#8A8278] focus:outline-none focus:ring-2 focus:ring-[#C45A2A] focus:border-transparent transition-all"
              placeholder="Пошук закладів, страв або категорій..."
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={onLoginClick}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#2E7D32] hover:bg-[#236026] text-[#EDE8D0] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
        >
          <UserIcon className="w-4 h-4" />
          <span>Увійти</span>
        </button>
      </div>
    </header>
  );
}