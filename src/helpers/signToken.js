const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');

dotenv.config();

const signToken = (userID) => JWT.sign(
  {
    iss: process.env.SECRET,
    sub: userID,
  },
  process.env.SECRET,
  { expiresIn: '4m' },
);

module.exports = signToken;
