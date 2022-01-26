const express = require('express');
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const auth = require('../middleware/auth');

function appRoutes() {
  const router = express.Router();

  router.post('/signup', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), createUser);

  router.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), login);

  router.get('/users', auth, usersRouter);
  router.get('/cards', auth, cardsRouter);

  router.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Server will crash now');
    }, 0);
  });

  return router;
}

module.exports = appRoutes;
