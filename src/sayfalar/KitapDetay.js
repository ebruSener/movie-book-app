import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../bilesenler/Header';
import '../App.css';

const KitapDetay = () => {
  const { id } = useParams();
  const [kitap, setKitap] = useState(null);

  useEffect(() => {
    const fetchKitap = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        setKitap(data.volumeInfo);
      } catch (error) {
        console.error('Kitap detayları yüklenirken bir hata oluştu:', error);
      }
    };

    fetchKitap();
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
          type: 'book',
          itemId: id,
          title: kitap.title,
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

  if (!kitap) return <p>Yükleniyor...</p>;

  return (
    <div>
      <Header />
      <div className="film-detay">
        <h1>{kitap.title}</h1>
        {kitap.imageLinks && <img src={kitap.imageLinks.thumbnail} alt={kitap.title} />}
        <p>Yazar: {kitap.authors ? kitap.authors.join(', ') : 'Bilinmiyor'}</p>
        <p>{kitap.description}</p>
        <button onClick={handleAddToFavorites}>Favorilere Ekle</button>
      </div>
    </div>
  );
};

export default KitapDetay; 