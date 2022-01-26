const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middleware/logger');
const appRoutes = require('./routes/index');
const { notFound, limiter } = require('./middleware/appConstants');
const ServerError = require('./middleware/errors/ServerError');

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());
app.use(limiter);

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://api.saappir.students.nomoreparties.sbs', 'https://saappir.students.nomoreparties.sbs'];
  const origin = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader(
    'Access-Control-Allow-Methdos',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(requestLogger);
app.use(appRoutes);
app.use('*', notFound);
app.use((err, req, res, next) => {
  throw new ServerError('Server error', err);
});

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
