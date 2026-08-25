import React from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';

export default function Homepage({ 
  meals, 
  loading, 
  searched, 
  favorites, 
  toggleFavorite, 
  selectedMeal, 
  setSelectedMeal 
}) {
  return (
    <div>
      {/* Loading & Status Messages */}
      {loading && <p className="text-center text-muted py-4">Seacrhing...</p>}

      {!loading && searched && meals.length === 0 && (
        <p className="text-center text-muted py-4">No Recipe!! please try again</p>
      )}

      {/* Recipe Cards Grid */}
      {!loading && (
        <div className="cards-grid">
          {meals.map((meal) => {
            const isFav = favorites.some((f) => f.idMeal === meal.idMeal);
            return (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                isFav={isFav}
                onToggleFav={toggleFavorite}
                onViewDetails={(mealData) => setSelectedMeal(mealData)}
              />
            );
          })}
        </div>
      )}

      {/* Modal Popup */}
      {selectedMeal && (
        <RecipeDetailModal
          meal={selectedMeal}
          isFav={favorites.some((f) => f.idMeal === selectedMeal.idMeal)}
          onToggleFav={toggleFavorite}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}