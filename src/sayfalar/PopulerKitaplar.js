import React, { useEffect, useState } from 'react';
import './PopulerKitaplar.css';

function PopulerKitaplar() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://openlibrary.org/search.json?q=popular')
      .then(response => response.json())
      .then(data => {
        setBooks(data.docs);
        setLoading(false);
      })
      .catch(error => {
        setError('Popüler kitaplar yüklenirken bir sorun oluştu.');
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
    <div className="book-carousel">
      {books.map(book => (
        <div className="book-card" key={book.key}>
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={book.title}
            className="book-cover"
          />
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>Yazar: {book.author_name ? book.author_name.join(', ') : 'Bilinmiyor'}</p>
            <p>Yayın Yılı: {book.first_publish_year || 'Bilinmiyor'}</p>
            <button>Favorilere Ekle</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopulerKitaplar; 