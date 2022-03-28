const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCardById);
cardsRouter.put('/:cardId/likes', addLike);
cardsRouter.delete('/:cardId/likes', removeLike);

module.exports = cardsRouter;
