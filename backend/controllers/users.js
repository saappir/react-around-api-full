const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorHandler = require('../middleware/errorHandler');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => { errorHandler(err, res); });
};

module.exports.getUserById = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => { errorHandler(err, res); });
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => { errorHandler(err, res); });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req._id,
    { name, about },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => { res.status(200).send(user); })
    .catch((err) => { errorHandler(err, res); });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => { res.status(200).send(user); })
    .catch((err) => { errorHandler(err, res); });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
      res.send({ user });
      res.header('authorization', `Bearer ${token}`);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
