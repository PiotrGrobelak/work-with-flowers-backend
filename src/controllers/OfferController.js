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
};

module.exports = offerController;
