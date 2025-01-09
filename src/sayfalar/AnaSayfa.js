import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import OnerilenFilmler from './OnerilenFilmler';
import PopulerKitaplar from './PopulerKitaplar';

function Anasayfa() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
        <h1>MOVIEBOOK</h1>
        <img src="/web_logo.png" alt="Site Logosu" />
        <nav className="nav-bar">
          <button onClick={() => navigate('/anasayfa')}>Ana Sayfa</button>
          <button onClick={() => navigate('/filmler')}>Filmler</button>
          <button onClick={() => navigate('/kitaplar')}>Kitaplar</button>
          <button onClick={() => navigate('/profil')}>Profil</button>
          <button onClick={() => navigate('/giris')}>Çıkış Yap</button>
        </nav>
      </header>
      <div className="search-bar">
        <input type="text" placeholder="Film veya Kitap Ara..." />
      </div>
      <div className="categories">
        <h2>Popüler Filmler</h2>
        <OnerilenFilmler />
        <h2>Popüler Kitaplar</h2>
        <PopulerKitaplar />
      </div>
      <footer className="footer">
        <p>MOVIEBOOK hakkında kısa bir açıklama.</p>
        <p>İletişim: info@moviebook.com</p>
        <p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
      </footer>
    </div>
  );
}

export default Anasayfa;