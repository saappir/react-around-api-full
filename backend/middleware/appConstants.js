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

module.exports = { notFound, limiter };
