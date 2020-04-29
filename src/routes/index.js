const express = require('express');
const passport = require('passport');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login', passport.authenticate('local', { session: false }), userController.userLogin);

module.exports = router;
