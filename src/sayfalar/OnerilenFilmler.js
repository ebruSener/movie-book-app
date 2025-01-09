import React, { useEffect, useState } from 'react';
import './OnerilenFilmler.css';

function OnerilenFilmler() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=6dd2d2c38d904ab0a956859a545e8db2&language=en-US&page=1')
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError('Filmleri yüklerken bir sorun oluştu.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="movie-carousel">
      {movies.map(movie => (
        <div className="movie-card" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>Yayın Tarihi: {movie.release_date}</p>
            <p>Ortalama Puan: {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OnerilenFilmler; 