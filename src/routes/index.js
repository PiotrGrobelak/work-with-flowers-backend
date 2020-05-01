const express = require('express');
const passport = require('passport');
const { userController, offerController } = require('../controllers');
require('../config/passport');

const router = express.Router();

router.post('/user/register', userController.userRegister);
router.post(
  '/user/login',
  passport.authenticate('local', { session: false }),
  userController.userLogin,
);
router.get(
  '/user/logout',
  passport.authenticate('jwt', { session: false }),
  userController.userLogout,
);

router.post(
  '/user/offer',
  passport.authenticate('jwt', { session: false }),
  userController.userAddOffer,
);
router.get(
  '/user/offers',
  passport.authenticate('jwt', { session: false }),
  userController.userGetOffers,
);

router.get(
  '/user/employer',
  passport.authenticate('jwt', { session: false }),
  userController.userEmployer,
);
router.get(
  '/user/authenticated',
  passport.authenticate('jwt', { session: false }),
  userController.userAuthenticated,
);

router.get('/offers', offerController.getAllOffers);

module.exports = router;
