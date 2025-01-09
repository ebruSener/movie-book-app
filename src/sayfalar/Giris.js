import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Giris() {
  return (
    <div>
      <header className="header">
        <h1>MOVIEBOOK</h1>
        <img src="/web_logo.png" alt="Site Logosu" />
      </header>
      <div className="login-container">
        <h1>Giriş Yap</h1>
        <form className="login-form">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Şifre:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Giriş Yap</button>
        </form>
        <p>
          Hesabınız yok mu? <Link to="/kayit">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
}

export default Giris;