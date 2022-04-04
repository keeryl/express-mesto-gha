const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');
const validation = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validation.createCard, createCard);
cardsRouter.delete('/:cardId', validation.validateCardId, deleteCardById);
cardsRouter.put('/:cardId/likes', validation.validateCardId, addLike);
cardsRouter.delete('/:cardId/likes', validation.validateCardId, removeLike);

module.exports = cardsRouter;
