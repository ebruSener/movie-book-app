const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// Favori ekleme
router.post('/add', async (req, res) => {
  const { userId, type, itemId, title } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Favori zaten var mı kontrol et
    const alreadyFavorite = user.favorites.some(
      (favorite) => favorite.itemId === itemId && favorite.type === type
    );

    if (alreadyFavorite) {
      return res.status(400).json({ error: 'Bu öğe zaten favorilerde.' });
    }

    // Favori ekle
    user.favorites.push({ type, itemId, title });
    await user.save();

    res.status(201).json({ message: 'Favori başarıyla eklendi.' });
  } catch (error) {
    console.error('Favori eklenirken bir hata oluştu:', error);
    res.status(500).json({ error: 'Favori eklenirken bir hata oluştu.' });
  }
});

module.exports = router;