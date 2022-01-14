const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../middleware/validateUrl');

const {
  updateAvatar, updateProfile, getUserById, getUsers,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get(
  '/me',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
  }),
  getUserById,
);

usersRouter.get(
  '/:userId',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
  }),
  getUserById,
);

usersRouter.patch(
  '/me',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(40),
      about: Joi.string().required().min(2).max(200),
    }),
  }),
  updateProfile,
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateUrl),
    }),
  }),
  updateAvatar,
);

module.exports = usersRouter;
