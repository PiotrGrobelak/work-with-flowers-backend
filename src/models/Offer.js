const mongoose = require('mongoose');

const WORK_TYPES = ['florist', 'courier', 'gardener', 'apprentice', 'conservator'];

const OfferSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: WORK_TYPES,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Offer', OfferSchema);
