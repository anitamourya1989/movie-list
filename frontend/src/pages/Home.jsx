import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log(popularMovies);
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const movies = await searchMovies(searchQuery);
      setMovies(movies);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }

    searchMovies(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <MovieCard key={movie.id} movie={movie} />
            )
        )}
      </div>
    </div>
  );
}

export default Home;
