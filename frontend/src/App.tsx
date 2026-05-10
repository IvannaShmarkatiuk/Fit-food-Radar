import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CatalogPage } from './pages/CatalogPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { LoginModal, UserData } from './components/LoginModal';
import { EditProfileModal } from './components/EditProfileModal';
import { Restaurant } from './types';

export function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://fitfood.runasp.net';

  const [currentPage, setCurrentPage] = useState<'catalog' | 'detail' | 'favorites'>('catalog');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/Restaurants`)
      .then(res => res.json())
      .then(data => { setRestaurants(data); setIsLoading(false); })
      .catch(err => { console.error(err); setIsLoading(false); });
  }, [API_URL]);

  const toggleFavorite = async (id: string) => {
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    const isFav = favorites.includes(id);
    try {
      if (isFav) {
        await fetch(`${API_URL}/api/Favorites/1/${id}`, { method: 'DELETE' });
        setFavorites(prev => prev.filter(fId => fId !== id));
      } else {
        const res = await fetch(`${API_URL}/api/Favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 1, restaurantId: parseInt(id) })
        });
        if (res.ok) setFavorites(prev => [...prev, id]);
      }
    } catch (e) { console.error(e); }
  };

  const handleLogin = (data: UserData) => {
    setUserName(data.name); setUserAvatar(data.avatarUrl); setIsLoggedIn(true); setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#B8B0A0]">
      <Header 
        onLoginClick={() => setShowLoginModal(true)} 
        onLogoClick={() => {setCurrentPage('catalog'); setSelectedRestaurantId(null);}} 
        isLoggedIn={isLoggedIn} userName={userName} userAvatar={userAvatar} 
        onLogout={() => setIsLoggedIn(false)} 
        onFavoritesClick={() => setCurrentPage('favorites')}
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        onEditProfileClick={() => setShowEditModal(true)}
      />
      {currentPage === 'catalog' && (
        <CatalogPage onRestaurantClick={(id) => {setSelectedRestaurantId(id); setCurrentPage('detail');}} 
          favorites={favorites} toggleFavorite={toggleFavorite} searchQuery={searchQuery}
          restaurants={restaurants} isLoading={isLoading} />
      )}
      {currentPage === 'detail' && selectedRestaurantId && (
        <RestaurantDetailPage restaurantId={selectedRestaurantId} onBack={() => setCurrentPage('catalog')} 
          userName={userName} userAvatar={userAvatar} isLoggedIn={isLoggedIn} />
      )}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} 
        onSave={(d) => {setUserName(d.name); setUserAvatar(d.avatarUrl); setShowEditModal(false);}} 
        currentName={userName} currentAvatar={userAvatar} />
    </div>
  );
}