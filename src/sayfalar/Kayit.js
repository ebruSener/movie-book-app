import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Kayit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (formData.password !== formData.confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }
    // Kayıt işlemi burada yapılacak
    // Kayıt başarılı olduğunda anasayfaya yönlendir
    navigate('/anasayfa');
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
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Şifre Onaylama:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Kayıt Ol</button>
        </form>
      </div>
    </div>
  );
}

export default Kayit;