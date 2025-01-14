import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Giris from "./sayfalar/Giris";
import Kayit from "./sayfalar/Kayit";
import AnaSayfa from "./sayfalar/AnaSayfa";
import FavoritesPage from "./sayfalar/FavoritesPage";
import Filmler from "./sayfalar/Filmler";
import Kitaplar from "./sayfalar/Kitaplar";
import FilmDetay from './sayfalar/FilmDetay';
import KitapDetay from './sayfalar/KitapDetay';
import Profil from './sayfalar/Profil';
import "./App.css";

// Auth Context oluştur
const AuthContext = createContext();

// Auth Provider bileşeni
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Token varsa giriş yapılmış kabul edilir

  const login = (token) => {
    localStorage.setItem("token", token); // Token'ı sakla
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token"); // Token'ı sil
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth Context kullanımı için kanca
export const useAuth = () => useContext(AuthContext);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><AnaSayfa /></ProtectedRoute>} />
          <Route path="/giris" element={<Giris />} />
          <Route path="/filmler" element={<ProtectedRoute><Filmler /></ProtectedRoute>} />
          <Route path="/kitaplar" element={<ProtectedRoute><Kitaplar /></ProtectedRoute>} />
          <Route path="/kayit" element={<Kayit />} />
          <Route path="/film/:id" element={<ProtectedRoute><FilmDetay /></ProtectedRoute>} />
          <Route path="/kitap/:id" element={<ProtectedRoute><KitapDetay /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
          <Route
            path="/favoriler"
            element={
              <ProtectedRoute>
                <FavoritesPage userId="kullanici_id" />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Korunan Rota (Giriş yapılmış mı kontrol eder)
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Giriş yapılmamışsa /giris sayfasına yönlendir
    return <Navigate to="/giris" state={{ from: location }} />;
  }

  return children;
};

export default App;
