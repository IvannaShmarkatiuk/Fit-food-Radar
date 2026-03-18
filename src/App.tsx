import React, { useState } from 'react';
import { Header } from './components/Header';
import { CatalogPage } from './pages/CatalogPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { LoginModal } from './components/LoginModal';

export function App() {
  const [currentPage, setCurrentPage] = useState<'catalog' | 'detail'>('catalog');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRestaurantClick = (id: string) => {
    setSelectedRestaurantId(id);
    setCurrentPage('detail');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBackToCatalog = () => {
    setCurrentPage('catalog');
    setSelectedRestaurantId(null);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#B8B0A0] font-sans selection:bg-[#2E7D32] selection:text-[#EDE8D0]">
      <Header
        onLoginClick={() => setShowLoginModal(true)}
        onLogoClick={handleBackToCatalog}
      />

      {currentPage === 'catalog' ? (
        <CatalogPage onRestaurantClick={handleRestaurantClick} />
      ) : (
        selectedRestaurantId && (
          <RestaurantDetailPage
            restaurantId={selectedRestaurantId}
            onBack={handleBackToCatalog}
          />
        )
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}