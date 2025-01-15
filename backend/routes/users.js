const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Kullanıcı modelini import edin
const auth = require('../middleware/auth'); // Auth middleware

// Kullanıcı bilgilerini döndüren rota
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Şifreyi döndürmeyin
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
