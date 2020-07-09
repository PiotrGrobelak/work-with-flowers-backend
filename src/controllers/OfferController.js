const Offer = require('../models/Offer');
const errorMessage = require('../helpers/errorMessage');

const offerController = {
  getAllOffers: async (req, res) => {
    const offers = await Offer.find().exec();
    try {
      res.status(200).json({ offers });
    } catch (err) {
      errorMessage(res);
    }
  },
  getOffersByType: async (req, res) => {
    const offers = await Offer.find({ type: req.query.type });
    try {
      res.status(200).json({ offers });
    } catch (err) {
      errorMessage(res);
    }
  },
  getOfferById: async (req, res) => {
    const currentOffer = await Offer.findById(req.params.id);
    try {
      res.status(200).json({ currentOffer });
    } catch (err) {
      errorMessage(res);
    }
  },
};

module.exports = offerController;
