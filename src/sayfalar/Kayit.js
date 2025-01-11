import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Kayit() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setSuccessMessage('Kayıt başarılı! Anasayfaya yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.error('Kayıt başarısız');
      }
    } catch (error) {
      console.error('Kayıt sırasında bir hata oluştu', error);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>MOVIEBOOK</h1>
        <img src="/web_logo.png" alt="Site Logosu" />
      </header>
      <div className="login-container">
        <h1>Kayıt Ol</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Kayıt Ol</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default Kayit;