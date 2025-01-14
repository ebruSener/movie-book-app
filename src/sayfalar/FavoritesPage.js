import React, { useEffect, useState } from 'react';
import Header from '../bilesenler/Header';
import { useAuth } from '../App';
import '../App.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();
  const userId = localStorage.getItem('userId'); // Kullanıcı ID'sini alın

  useEffect(() => {
    if (!isLoggedIn || !userId) {
      setError('Lütfen giriş yapın.');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setFavorites(data);
        } else {
          setError(data.error || 'Favoriler getirilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Favoriler getirilirken bir hata oluştu:', error);
        setError('Favoriler getirilirken bir hata oluştu.');
      }
    };

    fetchFavorites();
  }, [isLoggedIn, userId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <h1>Favorilerim</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.itemId}>
              {fav.title} ({fav.type})
            </li>
          ))}
        </ul>
      ) : (
        <p>Favoriniz yok.</p>
      )}
    </div>
  );
};

export default FavoritesPage; 