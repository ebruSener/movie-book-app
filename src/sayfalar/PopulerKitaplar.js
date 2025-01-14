import React, { useEffect, useState } from 'react';
import './PopulerKitaplar.css'; // CSS dosyasını dahil ediyoruz

const PopulerKitaplar = () => {
  const [kitaplar, setKitaplar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Google Books API çağrısı
    fetch(
      'https://www.googleapis.com/books/v1/volumes?q=popular&key=AIzaSyDa5EWYquiVSAMWXQBIZJ4aRymtbnhDKIk'
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setKitaplar(data.items.slice(0, 10)); // İlk 10 kitabı getir
        } else {
          setError('Hiçbir kitap bulunamadı.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Popüler kitaplar yüklenirken bir hata oluştu.');
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
    <div className="card-container">
      {kitaplar.map((kitap) => (
        <div className="card" key={kitap.id}>
          {/* Kitap Resmi */}
          {kitap.volumeInfo.imageLinks && kitap.volumeInfo.imageLinks.thumbnail ? (
            <img
              src={kitap.volumeInfo.imageLinks.thumbnail}
              alt={kitap.volumeInfo.title}
              className="book-thumbnail"
            />
          ) : (
            <img
              src="/placeholder-image.png"
              alt="Placeholder"
              className="book-thumbnail"
            />
          )}
          {/* Kitap Bilgileri */}
          <div className="card-content">
            <h3 className="book-title">{kitap.volumeInfo.title}</h3>
            <p className="book-authors">
              {kitap.volumeInfo.authors
                ? kitap.volumeInfo.authors.join(', ')
                : 'Bilinmiyor'}
            </p>
            <p className="book-published">
              Yayın Tarihi: {kitap.volumeInfo.publishedDate || 'Bilinmiyor'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopulerKitaplar;
