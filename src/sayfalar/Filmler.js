import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../bilesenler/Header';
import '../App.css';

const Filmler = () => {
  const [filmler, setFilmler] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const genres = [
    { name: 'Popüler', value: 'popular' },
    { name: 'Aksiyon', value: '28' },
    { name: 'Komedi', value: '35' },
    { name: 'Dram', value: '18' },
    { name: 'Korku', value: '27' },
    { name: 'Bilim Kurgu', value: '878' }
  ];
  const [selectedGenre, setSelectedGenre] = useState('popular');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmler = async () => {
      try {
        const genreQuery = selectedGenre === 'popular' ? 'popular' : `with_genres=${selectedGenre}`;
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6dd2d2c38d904ab0a956859a545e8db2&language=en-US&${genreQuery}&page=1`);
        if (!response.ok) {
          throw new Error('Veri yüklenemedi');
        }
        const data = await response.json();
        setFilmler(data.results || []);
      } catch (error) {
        console.error('Filmler yüklenirken bir hata oluştu:', error);
      }
    };

    fetchFilmler();
  }, [selectedGenre]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filmler.filter(film =>
      film.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilmler(filtered);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Film Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Ara</button>
        </form>
      </div>
      <div className="genre-filter">
        <select onChange={handleGenreChange} value={selectedGenre}>
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="movie-list">
        {filmler.length > 0 ? (
          filmler.map((film) => (
            <div key={film.id} className="movie-card" onClick={() => navigate(`/film/${film.id}`)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{film.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p>Filmler yüklenemedi.</p>
        )}
      </div>
    </div>
  );
};

export default Filmler;