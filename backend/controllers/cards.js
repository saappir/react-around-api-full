const mongodb = require('mongodb');
const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/NotFoundError');
const BadRequestError = require('../middleware/errors/BadRequestError');
const ForbiddenError = require('../middleware/errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('there is an empty field');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('No card found with that id');
    })
    .then((foundCard) => {
      const userId = req.user._id.toString();
      const ownerId = foundCard.owner.toString();
      if (userId === ownerId) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            res.status(200).send({ data: card });
          });
      } else if (userId !== ownerId) {
        throw new ForbiddenError('You are not the owner of this card');
      } else if (!mongodb.ObjectId.isValid(cardId)) {
        throw new BadRequestError('Invalid card id');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id.toString() } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with that id');
    })
    .then((card) => { res.status(200).send(card); })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Invalid card id');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with that id');
    })
    .then((card) => { res.status(200).send(card); })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Invalid card id');
      } else {
        next(err);
      }
    })
    .catch(next);
};
