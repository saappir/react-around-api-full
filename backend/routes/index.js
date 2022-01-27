const appRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const auth = require('../middleware/auth');

appRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

appRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

appRouter.use('/users', auth, usersRouter);
appRouter.use('/cards', auth, cardsRouter);

appRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

module.exports = appRouter;
