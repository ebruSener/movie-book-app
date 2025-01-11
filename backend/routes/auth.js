const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Kullanıcı modelini oluşturduğunuzu varsayıyorum

// Kayıt olma
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('Kullanıcı başarıyla kaydedildi');
  } catch (error) {
    res.status(500).send('Kayıt sırasında bir hata oluştu');
  }
});

// Giriş yapma
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'secret_key');
      res.json({ token });
    } else {
      res.status(401).send('Geçersiz email veya şifre');
    }
  } catch (error) {
    res.status(500).send('Giriş sırasında bir hata oluştu');
  }
});

module.exports = router; 