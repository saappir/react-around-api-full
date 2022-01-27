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

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
};

const allowedOrigins = ['http://localhost:3000', 'https://api.saappir.students.nomoreparties.sbs', 'https://saappir.students.nomoreparties.sbs'];

module.exports = {
  notFound, limiter, errorHandler, allowedOrigins,
};
