import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../bilesenler/Header';
import '../App.css';

const Kitaplar = () => {
  const [kitaplar, setKitaplar] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const genres = [
    { name: 'Popüler', value: 'popular' },
    { name: 'Fantastik', value: 'fantasy' },
    { name: 'Bilim Kurgu', value: 'science_fiction' },
    { name: 'Tarih', value: 'history' },
    { name: 'Roman', value: 'romance' },
    { name: 'Korku', value: 'horror' },
    { name: 'Gizem', value: 'mystery' }
  ];
  const [selectedGenre, setSelectedGenre] = useState('popular');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKitaplar = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${selectedGenre}`);
        const data = await response.json();
        setKitaplar(data.items);
      } catch (error) {
        console.error('Kitaplar yüklenirken bir hata oluştu:', error);
      }
    };

    fetchKitaplar();
  }, [selectedGenre]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = kitaplar.filter(kitap =>
      kitap.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setKitaplar(filtered);
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
            placeholder="Kitap Ara..."
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
      <div className="book-list">
        {kitaplar.map((kitap) => (
          <div key={kitap.id} className="book-card" onClick={() => navigate(`/kitap/${kitap.id}`)}>
            {kitap.volumeInfo.imageLinks && (
              <img
                src={kitap.volumeInfo.imageLinks.thumbnail}
                alt={kitap.volumeInfo.title}
                className="book-poster"
              />
            )}
            <h3>{kitap.volumeInfo.title}</h3>
            <p>{kitap.volumeInfo.authors ? kitap.volumeInfo.authors.join(', ') : 'Bilinmiyor'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kitaplar;
