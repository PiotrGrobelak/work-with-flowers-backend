// const passport = require('passport');
require('../config/passport');
const signToken = require('../helpers/signToken');
const User = require('../models/User');
// const Offer = require('../models/Offer');

const userController = {
  userRegister: (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
      }
      if (user) {
        res.status(400).json({ message: { msgBody: 'Username is alredy taken', msgError: true } });
      } else {
        const newUser = new User({ username, password, role });
        newUser.save((error) => {
          if (error) {
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
};

module.exports = userController;
