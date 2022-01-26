const rateLimit = require('express-rate-limit');
const NotFoundError = require('./errors/NotFoundError');

const notFound = () => {
  throw new NotFoundError('Page not found');
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: 'rate limit reached',
});

const allowedOrigins = ['http://localhost:3000', 'https://api.saappir.students.nomoreparties.sbs', 'https://saappir.students.nomoreparties.sbs'];
const corsConfig = (req, res, next) => {
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
};

module.exports = { notFound, limiter, corsConfig };
