import { Link, useLocation } from 'react-router-dom';

export default function Header({ 
  favCount = 0, 
  query, 
  setQuery, 
  handleSearch, 
  loading 
}) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="brand-eyebrow">Search · Save · Cook</div>
      <h1 className="brand-title">
         <em>Recipe</em> Finder
      </h1>
      <p className="brand-sub">
        A tidy little index of recipes from around the world — find something worth cooking tonight.
      </p>

      {/* Search Input Box */}
      <div className="search-wrap mb-4">
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Try 'chicken', 'pasta', 'cake'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs mb-4">
        <Link
          to="/"
          className={`tab-btn ${location.pathname === '/' ? 'active' : ''}`}
        >
          Search results
        </Link>
        <Link
          to="/favorites"
          className={`tab-btn ${location.pathname === '/favorites' ? 'active' : ''}`}
        >
          Favorites <span className="count">{favCount}</span>
        </Link>
      </div>
    </header>
  );
}