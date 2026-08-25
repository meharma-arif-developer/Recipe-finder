import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

export default function RecipeCard({ meal, isFav, onToggleFav, onViewDetails }) {
  const countIngredients = (mealObj) => {
    let count = 0;
    for (let i = 1; i <= 20; i++) {
      if (mealObj[`strIngredient${i}`] && mealObj[`strIngredient${i}`].trim()) {
        count++;
      }
    }
    return count || 8;
  };

  const ingredientCount = countIngredients(meal);

  return (
    <div className="card-item">
      <div className="card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        {meal.strCategory && (
          <span className="badge-overlay">{meal.strCategory}</span>
        )}
        <button 
          className={`heart-btn ${isFav ? 'active' : ''}`}
          onClick={() => onToggleFav(meal)}
          aria-label="Save to favorites"
        >
          {isFav ? <FaHeart /> : <CiHeart />}
        </button>
      </div>

      <div className="card-body-content">
        <h3 className="recipe-title">{meal.strMeal}</h3>
        <p className="recipe-meta">
          {meal.strArea ? `${meal.strArea} cuisine` : 'Global cuisine'} · {ingredientCount} ingredients
        </p>

        <button 
          className="view-details-btn"
          onClick={() => onViewDetails && onViewDetails(meal)}>View Details!! </button>
      </div>
    </div>
  );
}