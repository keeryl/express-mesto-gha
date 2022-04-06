const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');
const {
  CardSchema,
  CardIdSchema,
} = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate(CardSchema), createCard);
cardsRouter.delete('/:cardId', celebrate(CardIdSchema), deleteCardById);
cardsRouter.put('/:cardId/likes', celebrate(CardIdSchema), addLike);
cardsRouter.delete('/:cardId/likes', celebrate(CardIdSchema), removeLike);

module.exports = cardsRouter;
