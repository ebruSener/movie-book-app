import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../bilesenler/Header';
import '../App.css';

const FilmDetay = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6dd2d2c38d904ab0a956859a545e8db2&language=en-US`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error('Film detayları yüklenirken bir hata oluştu:', error);
      }
    };

    fetchFilm();
  }, [id]);

  const handleAddToFavorites = async () => {
    const userId = localStorage.getItem('userId'); // Kullanıcı ID'sini alın
    if (!userId) {
      alert('Lütfen giriş yapın.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/favorites/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: 'movie',
          itemId: film.id,
          title: film.title,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Favorilere eklendi!');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Favorilere eklenirken bir hata oluştu:', error);
      alert('Favorilere eklenirken bir hata oluştu.');
    }
  };

  if (!film) return <p>Yükleniyor...</p>;

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