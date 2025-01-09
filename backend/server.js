const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB'ye bağlan
mongoose.connect('mongodb://localhost:27017/kullaniciDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Kullanıcı şeması ve modeli
const kullaniciSchema = new mongoose.Schema({
  isim: String,
  email: String,
  sifre: String,
});

const Kullanici = mongoose.model('Kullanici', kullaniciSchema);

// JSON verilerini işlemek için middleware
app.use(express.json());

// Kullanıcı kaydetme endpoint'i
app.post('/api/kayit', async (req, res) => {
  const { isim, email, sifre } = req.body;
  try {
    const yeniKullanici = new Kullanici({ isim, email, sifre });
    await yeniKullanici.save();
    res.status(201).send('Kullanıcı başarıyla kaydedildi!');
  } catch (error) {
    res.status(400).send('Kullanıcı kaydedilemedi.');
  }
});

// Basit bir API endpoint
app.get('/api', (req, res) => {
  res.send('Merhaba, bu backend sunucusudur!');
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
}); 