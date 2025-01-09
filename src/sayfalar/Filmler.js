import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Filmler.css';

function Filmler() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const apiKey = '6dd2d2c38d904ab0a956859a545e8db2';

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      setError('Film türleri yüklenirken bir sorun oluştu.');
    }
  };

  const fetchMovies = async (url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      setError('Filmler yüklenirken bir sorun oluştu.');
      setLoading(false);
    }
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    if (genreId) {
      fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}`);
    } else {
      fetchMovies();
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery) {
      fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}`);
    } else {
      fetchMovies();
    }
  };

  if (loading) {
    return <div className="loading-spinner">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <header>
        <h1>Filmler</h1>
        <p>En popüler filmleri keşfedin!</p>
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value="">Tüm Türler</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </header>
      <nav className="nav-bar">
        <button onClick={() => navigate('/anasayfa')}>Ana Sayfa</button>
        <button onClick={() => navigate('/filmler')}>Filmler</button>
        <button onClick={() => navigate('/kitaplar')}>Kitaplar</button>
        <button onClick={() => navigate('/profil')}>Profil</button>
        <button onClick={() => navigate('/giris')}>Çıkış Yap</button>
      </nav>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Bir film ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Ara</button>
        </form>
      </div>
      <div className="movie-grid">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id} onClick={() => navigate(`/film/${movie.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Yayın Tarihi: {movie.release_date}</p>
              <p>Ortalama Puan: {movie.vote_average}</p>
              <button>Favorilere Ekle</button>
            </div>
          </div>
        ))}
      </div>
      <footer>
        MOVIEBOOK © 2025
      </footer>
    </div>
  );
}

export default Filmler;