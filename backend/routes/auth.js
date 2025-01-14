const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kayıt olma
router.post('/kayit', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Kayıt başarılı! Hoş geldiniz!' });
  } catch (error) {
    console.error('Kayıt sırasında hata:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Bu e-posta zaten kullanılıyor.' });
    } else {
      res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu.' });
    }
  }
});

// Giriş yapma
router.post('/giris', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Yanlış parola.' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.json({ message: 'Giriş başarılı!', token });
  } catch (error) {
    res.status(500).json({ error: 'Giriş sırasında bir hata oluştu.' });
  }
});

// Kullanıcı bilgilerini alma
router.get('/info', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findById(decoded.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı bilgileri alınamadı.' });
  }
});

module.exports = router;