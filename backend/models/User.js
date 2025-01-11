const mongoose = require('mongoose');

// Kullanıcı Şeması
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Kullanıcı Modeli
const User = mongoose.model('User', userSchema);

module.exports = User;
