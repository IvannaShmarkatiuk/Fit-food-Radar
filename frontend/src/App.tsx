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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null); 

    fetch(`${API_URL}/api/Restaurants`)
      .then(res => {
        if (!res.ok) throw new Error("Сервер Майї відпочиває");
        return res.json();
      })
      .then(data => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError("Майя, де бекенд? 🍕 Здається, сервер не запущено.");
        setIsLoading(false);
      });
  }, [API_URL]);

  const toggleFavorite = async (id: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    const isFav = favorites.includes(id.toString());
    try {
      if (isFav) {
       
        await fetch(`${API_URL}/api/Favorites/1/${id}`, { method: 'DELETE' });
        setFavorites(prev => prev.filter(fId => fId !== id.toString()));
      } else {
        const res = await fetch(`${API_URL}/api/Favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 1, restaurantId: parseInt(id) })
        });
        if (res.ok) setFavorites(prev => [...prev, id.toString()]);
      }
    } catch (e) { console.error("Favorite toggle error:", e); }
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

  const handleEditProfile = (data: { name: string; avatarUrl: string | null }) => {
    setUserName(data.name);
    setUserAvatar(data.avatarUrl);
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#B8B0A0]">
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
        onEditProfileClick={() => setShowEditModal(true)}
      />

      <main className="pt-20"> {}
        {currentPage === 'catalog' && (
          error ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
              <h2 className="text-3xl font-bold text-[#EDE8D0] mb-4">{error}</h2>
              <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#2E7D32] text-[#EDE8D0] rounded-xl font-bold hover:bg-[#388E3C] transition-all">
                Спробувати підключитись 🔄
              </button>
            </div>
          ) : (
            <CatalogPage 
              onRestaurantClick={handleRestaurantClick} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite}
              searchQuery={searchQuery}
              restaurants={restaurants}
              isLoading={isLoading}
            />
          )
        )}

        {currentPage === 'detail' && selectedRestaurantId && (
          <RestaurantDetailPage 
            restaurantId={selectedRestaurantId} 
            onBack={handleBackToCatalog} 
            userName={userName} 
            userAvatar={userAvatar} 
            isLoggedIn={isLoggedIn} 
          />
        )}
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} onSave={handleEditProfile} currentName={userName} currentAvatar={userAvatar} />
    </div>
  );
}