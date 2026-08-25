import React from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';

export default function Favoritespage({ 
  favorites, 
  toggleFavorite, 
  selectedMeal, 
  setSelectedMeal 
}) {
  return (
    <div className="favorites-container">
      {favorites.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5"> No favorite recipe!!</p>
        </div>
      ) : (
        <div className="cards-grid">
          {favorites.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              isFav={true}
              onToggleFav={toggleFavorite}
              onViewDetails={(mealData) => setSelectedMeal(mealData)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedMeal && (
        <RecipeDetailModal
          meal={selectedMeal}
          isFav={true}
          onToggleFav={toggleFavorite}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}