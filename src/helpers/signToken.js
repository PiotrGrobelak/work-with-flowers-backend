const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');

dotenv.config();

const signToken = (userID) => JWT.sign(
  {
    iss: 'MyFlower',
    sub: userID,
  },
  'MyFlower',
  { expiresIn: '30m' },
);

module.exports = signToken;
