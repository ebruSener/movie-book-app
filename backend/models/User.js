const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: {
        type: String,
        enum: ['book', 'movie'],
        required: true,
      },
      itemId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
