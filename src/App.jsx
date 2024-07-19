import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      alert("Please enter a movie name");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      const moviesWithDogImages = await Promise.all(data.docs.map(async (movie) => {
        const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random');
        const dogData = await dogResponse.json();
        return { ...movie, dogImage: dogData.message };
      }));

      setMovies(moviesWithDogImages);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
    setLoading(false);
    setQuery(""); 
  };


  return (
    <div className="App bg-gray-200 shadow-2xl min-h-screen py-10">
      <h1 className="mb-4 font-bold text-2xl">Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit" className="bg-blue-400 py-[12px] ml-2 rounded-lg px-6 text-white">Search</button>
      </form>
      {loading ? (
        <span className="loading loading-dots loading-lg my-40"></span>
      ) : (
        <div className="movies">
          {movies.map((movie) => (
            <MovieCard key={movie.key} movie={movie} />
          ))}
        </div>
      )}

      {
        movies.length === 0 && !loading && <p className="my-40 font-semibold text-2xl text-red-800">Movies Not Found</p>
      }
    </div>
  );
};

export default App;
