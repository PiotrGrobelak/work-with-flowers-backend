const mongoose = require('mongoose');

const WORK_TYPES = ['florist', 'courier', 'gardener', 'apprentice', 'conservator'];

const OfferSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: WORK_TYPES,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Offer', OfferSchema);
