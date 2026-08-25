import React from 'react';

export default function RecipeDetailModal({ meal, isFav, onToggleFav, onClose }) {
  if (!meal) return null;

  const getIngredients = () => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        list.push({ name: ingredient, measure: measure || '' });
      }
    }
    return list;
  };

  const ingredients = getIngredients();
  const tags = meal.strTags ? meal.strTags.split(',') : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <div className="modal-hero">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="modal-hero-overlay">
            <h2 className="modal-title">{meal.strMeal}</h2>
            <div className="modal-tags">
              {meal.strCategory && <span className="modal-tag">{meal.strCategory}</span>}
              {meal.strArea && <span className="modal-tag">{meal.strArea}</span>}
              {tags.map((tag, idx) => (
                <span key={idx} className="modal-tag">{tag.trim()}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body margin">
          <div className="modal-action-row">
            <button 
              className={`modal-fav-btn ${isFav ? 'saved' : ''}`}
              onClick={() => onToggleFav(meal)}
            >
              {isFav ? 'Saved to favorites' : 'Save to favorites'}
            </button>
          </div>

          <section className="modal-section">
            <h3 className="modal-section-title">INGREDIENTS</h3>
            <div className="ingredients-grid">
              {ingredients.map((item, idx) => (
                <div key={idx} className="ingredient-item">
                  <span className="ing-name">{item.name}</span>
                  <span className="ing-measure">{item.measure}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="modal-section">
            <h3 className="modal-section-title">INSTRUCTIONS</h3>
            <p className="instructions-text">{meal.strInstructions}</p>
          </section>

          <section className="modal-section">
            <h3 className="modal-section-title">GOOD TO KNOW</h3>
            <div className="good-to-know-row">
              <div>
                <span className="meta-label">CATEGORY</span>
                <span className="meta-value">{meal.strCategory || 'N/A'}</span>
              </div>
              {meal.strYoutube && (
                <div>
                  <span className="meta-label">VIDEO</span>
                  <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="meta-link">
                    Watch on YouTube
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}