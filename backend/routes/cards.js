const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../middleware/validateUrl');

const {
  dislikeCard, likeCard, getCards, createCard, deleteCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post(
  '/',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(1).max(30),
      link: Joi.string().required().custom(validateUrl),
    }),
  }),
  createCard,
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
  }),
  deleteCard,
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
    body: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);

cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
    body: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRouter;
