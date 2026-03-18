import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { RestaurantCard } from '../components/RestaurantCard';
import { mockRestaurants } from '../data/restaurants';

interface CatalogPageProps {
  onRestaurantClick: (id: string) => void;
}

const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

export function CatalogPage({ onRestaurantClick }: CatalogPageProps) {
  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 flex gap-8">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#EDE8D0] mb-2">
            Знайди смачну їжу біля корпусу
          </h1>
          <p className="text-[#B8B0A0]">
            Знаходь найкращі місця, оцінені студентами для студентів.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {mockRestaurants.map((restaurant) => (
            <motion.div key={restaurant.id} variants={itemVariants}>
              <RestaurantCard
                restaurant={restaurant}
                onClick={onRestaurantClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}