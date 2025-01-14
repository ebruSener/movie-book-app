import React, { useState, useEffect } from 'react';
import Header from '../bilesenler/Header';
import '../App.css';

const Profil = () => {
  const [userInfo, setUserInfo] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Kullanıcı ID'sini alın

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUserInfo(data);
        } else {
          setError(data.error || 'Profil bilgileri getirilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Profil bilgileri getirilirken bir hata oluştu:', error);
        setError('Profil bilgileri getirilirken bir hata oluştu.');
      }
    };

    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    if (showFavorites) {
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
    }
  }, [showFavorites, userId]);

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1>Profilim</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="profile-info">
            <p>Email: {userInfo.email}</p>
            {/* Diğer profil bilgilerini buraya ekleyebilirsiniz */}
          </div>
        )}
        <button onClick={toggleFavorites} className="favorites-button">
          Favorilerim
        </button>
        {showFavorites && (
          <div className="favorites-list">
            {error ? (
              <p>{error}</p>
            ) : (
              <ul>
                {favorites.map((fav) => (
                  <li key={fav.itemId}>
                    {fav.title} ({fav.type})
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil; 