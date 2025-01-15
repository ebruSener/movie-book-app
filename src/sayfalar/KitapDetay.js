import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../bilesenler/Header';
import '../App.css';

const KitapDetay = () => {
  const { id } = useParams();
  const [kitap, setKitap] = useState(null);

  useEffect(() => {
    const fetchKitapDetay = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        setKitap(data.volumeInfo);
      } catch (error) {
        console.error('Kitap detayları yüklenirken bir hata oluştu:', error);
      }
    };

    fetchKitapDetay();
  }, [id]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(fav => fav.id === id);

    if (isAlreadyFavorite) {
      alert('Bu kitap zaten favorilerde');
    } else {
      favorites.push({
        id,
        title: kitap.title,
        imageLinks: kitap.imageLinks,
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Kitap favorilere eklendi');
    }
  };

  if (!kitap) return <div>Yükleniyor...</div>;

  return (
    <div>
      <Header />
      <div className="kitap-detay">
        <h1>{kitap.title}</h1>
        {kitap.imageLinks && (
          <img src={kitap.imageLinks.thumbnail} alt={kitap.title} />
        )}
        <p>{kitap.description}</p>
        <button onClick={handleAddToFavorites}>Favorilere Ekle</button>
      </div>
    </div>
  );
};

export default KitapDetay; 