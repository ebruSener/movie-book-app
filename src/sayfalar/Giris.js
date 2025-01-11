import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Giris() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/anasayfa');
      } else {
        console.error('Giriş başarısız');
      }
    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu', error);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>MOVIEBOOK</h1>
        <img src="/web_logo.png" alt="Site Logosu" />
      </header>
      <div className="login-container">
        <h1>Giriş Yap</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Şifre:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

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