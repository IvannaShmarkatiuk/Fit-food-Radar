import React, { useState } from 'react';
import { Header } from './components/Header';
import { CatalogPage } from './pages/CatalogPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { LoginModal, UserData } from './components/LoginModal';
import { mockRestaurants } from './data/restaurants';
import { RestaurantCard } from './components/RestaurantCard';

export function App() {
  const [currentPage, setCurrentPage] = useState<'catalog' | 'detail' | 'favorites'>('catalog');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]); 
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]);
  };

  const handleRestaurantClick = (id: string) => {
    setSelectedRestaurantId(id);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setCurrentPage('catalog');
    setSelectedRestaurantId(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (data: UserData) => {
    setUserName(data.name);
    setUserAvatar(data.avatarUrl);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserAvatar(null);
    setFavorites([]);
    if (currentPage === 'favorites') setCurrentPage('catalog');
  };

  const renderFavorites = () => {
    const favs = mockRestaurants.filter(r => favorites.includes(r.id));
    return (
      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-[#EDE8D0] mb-8">Улюблені заклади</h1>
        {favs.length === 0 ? (
          <div className="text-center py-20 text-[#8A8278] text-lg bg-[#1A1A1A] rounded-xl border border-[#333333]">Ви ще не додали жодного закладу до улюблених 💔</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favs.map(r => (
              <RestaurantCard key={r.id} restaurant={r} onClick={() => handleRestaurantClick(r.id)} isFavorite={true} onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(r.id); }} />
            ))}
          </div>
        )}
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#B8B0A0] font-sans selection:bg-[#2E7D32] selection:text-[#EDE8D0]">
      <Header 
        onLoginClick={() => setShowLoginModal(true)} 
        onLogoClick={handleBackToCatalog} 
        isLoggedIn={isLoggedIn} 
        userName={userName} 
        userAvatar={userAvatar} 
        onLogout={handleLogout} 
        onFavoritesClick={() => setCurrentPage('favorites')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {currentPage === 'catalog' && (
        <CatalogPage 
          onRestaurantClick={handleRestaurantClick} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
        />
      )}

      {currentPage === 'detail' && selectedRestaurantId && (
        <RestaurantDetailPage restaurantId={selectedRestaurantId} onBack={handleBackToCatalog} userName={userName} userAvatar={userAvatar} isLoggedIn={isLoggedIn} />
      )}

      {currentPage === 'favorites' && renderFavorites()}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
    </div>
  );
}