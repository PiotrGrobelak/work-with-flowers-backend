const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const signToken = (userID) => JWT.sign(
  {
    iss: process.env.SECRET,
    sub: userID,
  },
  process.env.SECRET,
  { expiresIn: '1h' },
);

module.exports = signToken;
