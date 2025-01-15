import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../bilesenler/Header';
import '../App.css';

const FilmDetay = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilmDetay = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6dd2d2c38d904ab0a956859a545e8db2&language=en-US`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error('Film detayları yüklenirken bir hata oluştu:', error);
      }
    };

    fetchFilmDetay();
  }, [id]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(fav => fav.id === film.id);

    if (isAlreadyFavorite) {
      alert('Bu film zaten favorilerde');
    } else {
      favorites.push({
        id: film.id,
        title: film.title,
        poster_path: film.poster_path,
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Film favorilere eklendi');
    }
  };

  if (!film) return <div>Yükleniyor...</div>;

  return (
    <div>
      <Header />
      <div className="film-detay">
        <h1>{film.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
        <p>IMDB: {film.vote_average}</p>
        <p>{film.overview}</p>
        <button onClick={handleAddToFavorites}>Favorilere Ekle</button>
      </div>
    </div>
  );
};

export default FilmDetay; 