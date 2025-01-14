const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  type: { type: String, enum: ['book', 'movie'], required: true },
  itemId: { type: String, required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Favorite', favoriteSchema); 