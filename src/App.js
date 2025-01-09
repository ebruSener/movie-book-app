import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Giris from "./sayfalar/Giris";
import Anasayfa from "./sayfalar/AnaSayfa";
import Filmler from "./sayfalar/Filmler";
import Kitaplar from "./sayfalar/Kitaplar";
import Profil from "./sayfalar/Profil";
import Kayit from "./sayfalar/Kayit";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/giris" />} />
        <Route path="/giris" element={<Giris />} />
        <Route path="/anasayfa" element={<Anasayfa />} />
        <Route path="/filmler" element={<Filmler />} />
        <Route path="/kitaplar" element={<Kitaplar />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/kayit" element={<Kayit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;