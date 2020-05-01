const User = require('../models/User');
const Offer = require('../models/Offer');
const signToken = require('../helpers/signToken');

const userController = {
  userRegister: (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
      }
      if (user) {
        res.status(400).json({ message: { msgBody: 'Username is already taken', msgError: true } });
      } else {
        const newUser = new User({ username, password, role });
        newUser.save((err) => {
          if (err) {
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
          } else {
            res
              .status(201)
              .json({ message: { msgBody: 'Account successfully created', msgError: false } });
          }
        });
      }
    });
  },
  userLogin: (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  },
  userLogout: (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: '', role: '' }, success: true });
  },
  userAddOffer: (req, res) => {
    const offer = new Offer(req.body);
    offer.save((err) => {
      if (err) {
        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
      } else {
        req.user.offers.push(offer);
        req.user.save((err) => {
          if (err) {
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
          } else {
            res
              .status(200)
              .json({ message: { msgBody: 'Successfully created offer', msgError: false } });
          }
        });
      }
    });
  },
  userGetOffers: (req, res) => {
    User.findById({ _id: req.user._id })
      .populate('offers')
      .exec((err, doc) => {
        if (err) {
          res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
        } else {
          res.status(200).json({ offers: doc.offers, authenticated: true });
        }
      });
  },
  userEmployer: (req, res) => {
    if (req.user.role === 'employer') {
      res.status(200).json({ message: { msgBody: 'You are an employer', msgError: false } });
    } else {
      res.status(403).json({ message: { msgBody: "You're not an admin,go away", msgError: true } });
    }
  },
  userAuthenticated: (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  },
};

module.exports = userController;
