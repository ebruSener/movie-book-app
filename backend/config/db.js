const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB bağlantı URL'si
    await mongoose.connect('mongodb+srv://ebrusener543:ZKGRrLSKddGCC7pb@cluster0.pr9kq.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message);
    process.exit(1); // Hata durumunda uygulamayı durdur
  }
};

// Fonksiyonu dışa aktar
module.exports = connectDB;
