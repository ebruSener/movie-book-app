const express = require('express');
const connectDB = require('./config/db'); // MongoDB bağlantı dosyası
const authRoutes = require('./routes/auth'); // Authentication ile ilgili rotalar
const favoriteRoutes = require('./routes/favorites'); // Favorilerle ilgili rotalar
const cors = require('cors'); // CORS politikası için middleware


const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
connectDB(); // Bağlantı başlatılır

// API Rotaları
app.use('/api/auth', authRoutes); // Kimlik doğrulama rotası
app.use('/api/favorites', favoriteRoutes); // Favoriler rotası


// Sunucu Port Ayarı
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Hata Yönetimi
process.on('uncaughtException', (err) => {
  console.error('Beklenmedik bir hata oluştu:', err);
  process.exit(1);
});
