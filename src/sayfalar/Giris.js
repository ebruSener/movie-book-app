import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../App';

const Giris = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/giris', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        login(data.token); // Kullanıcıyı oturum açmış olarak işaretle
        navigate('/anasayfa'); // Ana sayfaya yönlendir
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu:', error);
      alert('Giriş işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <div>
      <header className="header">
        <h1>MOVIEBOOK</h1>
        <img src="/web_logo.svg" alt="Site Logosu" />
      </header>
      <div className="form-container">
        <h1>Giriş Yap</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Giriş Yap</button>
        </form>
        <p>
          Hesabınız yok mu?{' '}
          <button onClick={() => navigate('/kayit')} className="link-button">
            Kayıt Olun
          </button>
        </p>
      </div>
    </div>
  );
};

export default Giris;
