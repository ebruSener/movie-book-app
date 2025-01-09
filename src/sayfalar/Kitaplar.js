import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kitaplar.css';

function Kitaplar() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('fantasy');
  const navigate = useNavigate();

  const genres = [
    { name: 'Fantastik', value: 'fantasy' },
    { name: 'Bilim Kurgu', value: 'science_fiction' },
    { name: 'Tarih', value: 'history' },
    { name: 'Roman', value: 'romance' },
    { name: 'Korku', value: 'horror' },
    { name: 'Gizem', value: 'mystery' }
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`https://openlibrary.org/subjects/${selectedGenre}.json`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.works);
        setLoading(false);
      })
      .catch(error => {
        setError('Kitaplar yüklenirken bir hata oluştu.');
        setLoading(false);
      });
  }, [selectedGenre]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
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
        <h1>Kitaplar</h1>
        <p>Tür seçerek kitapları keşfedin.</p>
        <select onChange={handleGenreChange} value={selectedGenre}>
          {genres.map(genre => (
            <option key={genre.value} value={genre.value}>
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
        <input type="text" placeholder="Bir kitap ara..." />
      </div>
      <div className="book-grid">
        {books.map(book => (
          <div className="book-card" key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
              alt={book.title}
              className="book-cover"
            />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>Yazar: {book.authors.map(author => author.name).join(', ')}</p>
              <p>Yayın Yılı: {book.first_publish_year || 'Bilinmiyor'}</p>
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

export default Kitaplar;
