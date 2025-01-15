import React, { useState, useEffect } from 'react';
import Header from '../bilesenler/Header';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const [userInfo, setUserInfo] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Kullanıcı bilgileri alınamadı');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Kullanıcı bilgileri alınırken bir hata oluştu:', error);
      }
    };

    fetchUserInfo();

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1>Hesap Bilgileri</h1>
        <div className="account-info">
          <p><strong>Email:</strong> {userInfo.email}</p>
          {/* Diğer hesap bilgilerini buraya ekleyebilirsiniz */}
        </div>
        <button onClick={toggleFavorites} className="favorites-button">
          Favorilerim
        </button>
        {showFavorites && (
          <div className="favorites-list">
            {favorites.length === 0 ? (
              <p>Henüz favori film veya kitap eklemediniz.</p>
            ) : (
              favorites.map(item => (
                <div
                  key={item.id}
                  className="favorite-card"
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <img
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : item.imageLinks?.thumbnail}
                    alt={item.title}
                    className="favorite-poster"
                    onClick={() => navigate(item.poster_path ? `/film/${item.id}` : `/kitap/${item.id}`)}
                  />
                  <h3>{item.title}</h3>
                  {hoveredItemId === item.id && (
                    <button
                      className="remove-favorite-button"
                      onClick={() => handleRemoveFavorite(item.id)}
                    >
                      Favorilerden Kaldır
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil; 