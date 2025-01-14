import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Kayit = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kayıt işlemleri
    navigate('/giris');
  };

  return (
    <div>
      <header className="simple-header">
        <h1>MOVIEBOOK</h1>
        <img src="/web_logo.svg" alt="Site Logosu" />
      </header>
      <div className="form-container">
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Kayıt Ol</button>
        </form>
      </div>
    </div>
  );
};

export default Kayit;
