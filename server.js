const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./src/routes/index');

const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use('/user', userRouter);

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
