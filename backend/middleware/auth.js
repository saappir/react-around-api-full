const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

// const JWT_SECRET = '23b6d720ff69c01432347ba736224ad80d5c952dd380d439636ac767d9d2a0e4';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: err });
  }
  req.user = payload._id;
  next();
};
