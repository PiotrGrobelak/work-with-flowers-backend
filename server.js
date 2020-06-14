const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./src/routes');

const PORT = process.env.PORT || 2000;

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser('dsdafvcewve'));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: 'https://work-with-flowers.netlify.app',
  }),
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', routes);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connect with Atlas flowersDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
