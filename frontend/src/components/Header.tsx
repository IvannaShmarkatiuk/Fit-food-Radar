import React, { useState } from 'react';
import { SearchIcon, UserIcon, LogOutIcon, HeartIcon, ChevronDownIcon, SendIcon, LifeBuoyIcon } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onLogoClick: () => void;
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string | null;
  onLogout: () => void;
  onFavoritesClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEditProfileClick: () => void;
}

export function Header({ onLoginClick, onLogoClick, isLoggedIn, userName, userAvatar, onLogout, onFavoritesClick, searchQuery, onSearchChange }: HeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#1A1A1A] border-b border-[#333333] sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
          <img src="/favicon.png" alt="Логотип" className="h-12 w-12 object-contain rounded-full bg-[#EDE8D0]" />
          <span className="text-[#EDE8D0] font-bold text-xl hidden md:block tracking-wide">Де поїсти ФІТ?</span>
        </button>

        <div className="flex-1 max-w-[500px] mx-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-[#8A8278] group-focus-within:text-[#C45A2A] transition-colors" />
            </div>
            <input type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="block w-full pl-11 pr-4 py-3 bg-[#121212] border border-[#333333] rounded-lg text-[#EDE8D0] placeholder-[#8A8278] focus:outline-none focus:ring-2 focus:ring-[#C45A2A] focus:border-transparent transition-all" placeholder="Пошук закладів..." />
          </div>
        </div>

        {isLoggedIn ? (
          <div className="relative">
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-3 hover:bg-[#252525] p-2 rounded-xl transition-colors focus:outline-none">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#EDE8D0] font-bold text-lg shadow-lg overflow-hidden bg-[#C45A2A]">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover bg-[#EDE8D0]" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[#EDE8D0] font-medium">{userName}</span>
                <ChevronDownIcon className={`w-4 h-4 text-[#8A8278] transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {isProfileMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#1A1A1A] border border-[#333333] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in duration-200">

                  {}

                  <button onClick={() => { onFavoritesClick(); setIsProfileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[#EDE8D0] hover:bg-[#252525] transition-colors">
                    <HeartIcon className="w-5 h-5 text-[#C45A2A]" />
                    <span className="font-medium">Улюблені заклади</span>
                  </button>

                  <div className="h-px bg-[#333333] my-2" />

                  <div className="px-4 py-3">
                    <div className="flex items-start gap-3 mb-4">
                      <SendIcon className="w-5 h-5 text-[#2E7D32] mt-0.5" />
                      <div>
                        <p className="text-[10px] text-[#8A8278] uppercase font-bold tracking-wider mb-0.5">Хочете додати заклад?</p>
                        <p className="text-[#EDE8D0] text-sm">Пишіть: <span className="text-[#2E7D32] font-semibold">@geniykabesnika</span></p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <LifeBuoyIcon className="w-5 h-5 text-[#3B82F6] mt-0.5" />
                      <div>
                        <p className="text-[10px] text-[#8A8278] uppercase font-bold tracking-wider mb-0.5">Потрібна підтримка?</p>
                        <p className="text-[#EDE8D0] text-sm">Зв'язок: <span className="text-[#3B82F6] font-semibold">@geniykabesnika</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-[#333333] my-2" />

                  <button onClick={() => { onLogout(); setIsProfileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors group">
                    <LogOutIcon className="w-5 h-5" />
                    <span className="font-medium">Вийти з акаунта</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button onClick={onLoginClick} className="flex items-center gap-2 px-6 py-2.5 bg-[#2E7D32] hover:bg-[#236026] text-[#EDE8D0] font-medium rounded-lg">
            <UserIcon className="w-4 h-4" /><span>Увійти</span>
          </button>
        )}
      </div>
    </header>
  );
}
