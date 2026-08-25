import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Homepage';
import Favoritespage from './pages/Favoritespage';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // LocalStorage se Favorites Initial Load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favs') || '[]');
    setFavorites(saved);
    fetchRecipes('');
  }, []);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchRecipes(query.trim());
  };

  const toggleFavorite = (meal) => {
    const exists = favorites.some((f) => f.idMeal === meal.idMeal);
    let updated = exists
      ? favorites.filter((f) => f.idMeal !== meal.idMeal)
      : [...favorites, meal];

    setFavorites(updated);
    localStorage.setItem('favs', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header 
          favCount={favorites.length}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          loading={loading}
        />
        <main className="container py-4 flex-grow-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  meals={meals}
                  loading={loading}
                  searched={searched}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  selectedMeal={selectedMeal}
                  setSelectedMeal={setSelectedMeal}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favoritespage 
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  selectedMeal={selectedMeal}
                  setSelectedMeal={setSelectedMeal}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;