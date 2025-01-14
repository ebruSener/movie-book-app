import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı kaldır
    navigate('/giris'); // Giriş sayfasına yönlendir
  };

  return (
    <header className="header">
      <h1>MOVIEBOOK</h1>
      <img src="/web_logo.svg" alt="Site Logosu" />
      <nav className="nav-bar">
        <button onClick={() => navigate('/')}>Ana Sayfa</button>
        <button onClick={() => navigate('/filmler')}>Filmler</button>
        <button onClick={() => navigate('/kitaplar')}>Kitaplar</button>
        <button onClick={() => navigate('/profil')}>Profil</button>
        <button onClick={handleLogout}>Çıkış Yap</button>
      </nav>
    </header>
  );
};

export default Header; 