import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../bilesenler/Header';
import '../App.css';

const AnaSayfa = () => {
  const [populerFilmler, setPopulerFilmler] = useState([]);
  const [populerKitaplar, setPopulerKitaplar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopulerFilmler = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=6dd2d2c38d904ab0a956859a545e8db2&language=en-US&page=1');
        const data = await response.json();
        setPopulerFilmler(data.results);
      } catch (error) {
        console.error('Popüler filmler yüklenirken bir hata oluştu:', error);
      }
    };

    const fetchPopulerKitaplar = async () => {
      try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=popular');
        const data = await response.json();
        setPopulerKitaplar(data.items);
      } catch (error) {
        console.error('Popüler kitaplar yüklenirken bir hata oluştu:', error);
      }
    };

    fetchPopulerFilmler();
    fetchPopulerKitaplar();
  }, []);

  return (
    <div>
      <Header />
      <h2>Popüler Filmler</h2>
      <div className="popular-section">
        {populerFilmler.map((film) => (
          <div key={film.id} className="popular-card" onClick={() => navigate(`/film/${film.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
              className="popular-poster"
            />
            <h3>{film.title}</h3>
          </div>
        ))}
      </div>

      <h2>Popüler Kitaplar</h2>
      <div className="popular-section">
        {populerKitaplar.map((kitap) => (
          <div key={kitap.id} className="popular-card" onClick={() => navigate(`/kitap/${kitap.id}`)}>
            <img
              src={kitap.volumeInfo.imageLinks?.thumbnail}
              alt={kitap.volumeInfo.title}
              className="popular-poster"
            />
            <h3>{kitap.volumeInfo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnaSayfa;
