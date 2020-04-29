const express = require('express');
const passport = require('passport');
const { userController } = require('../controllers');
// require('../config/passport');

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

module.exports = router;
