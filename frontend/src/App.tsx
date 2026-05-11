import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CatalogPage } from './pages/CatalogPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { LoginModal, UserData } from './components/LoginModal';
import { Restaurant } from './types';

export function App() {
  const API_URL = 'https://fitfood-api.onrender.com'; 
  const [currentPage, setCurrentPage] = useState<'catalog' | 'detail'>('catalog');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/Restaurants`)
      .then(res => res.json())
      .then(data => { setRestaurants(data); setIsLoading(false); })
      .catch(err => console.error("Помилка завантаження ресторанів:", err));
    
    const savedId = localStorage.getItem('user_id');
    const savedName = localStorage.getItem('user_name');
    if (savedId && savedName) {
      setCurrentUserId(Number(savedId));
      setUserName(savedName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (data: UserData) => {
    setCurrentUserId(data.id);
    setUserName(data.name);
    setUserAvatar(data.avatarUrl);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    localStorage.setItem('user_id', data.id.toString());
    localStorage.setItem('user_name', data.name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserId(null);
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#B8B0A0]">
      <Header 
        onLoginClick={() => setShowLoginModal(true)} 
        onLogoClick={() => setCurrentPage('catalog')} 
        isLoggedIn={isLoggedIn} 
        userName={userName} 
        userAvatar={userAvatar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={handleLogout}
        onFavoritesClick={() => {}} // Можна додати пізніше
        onEditProfileClick={() => {}}
      />
      
      {currentPage === 'catalog' ? (
        <CatalogPage 
          onRestaurantClick={(id) => { setSelectedRestaurantId(id); setCurrentPage('detail'); }} 
          restaurants={restaurants} 
          isLoading={isLoading} 
          favorites={[]} 
          toggleFavorite={() => {}} 
          searchQuery={searchQuery} 
        />
      ) : (
        <RestaurantDetailPage 
          restaurantId={selectedRestaurantId} 
          onBack={() => setCurrentPage('catalog')} 
          userName={userName} 
          userAvatar={userAvatar} 
          isLoggedIn={isLoggedIn}
          userId={currentUserId}
        />
      )}
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
    </div>
  );
}