const Card = require('../models/card');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_500).send({ message: 'На сервере произошла ошибка.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      return res.status(ERROR_500).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_404).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_400).send({
          message: 'Передан невалидный id карточки.',
        });
      }
      return res.status(ERROR_500).send({
        message: 'На сервере произошла ошибка.',
      });
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_404).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_400).send({
          message: 'Передан невалидный id карточки.',
        });
      }
      return res.status(ERROR_500).send({
        message: 'На сервере произошла ошибка.',
      });
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_404).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные для снятия лайка.',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_400).send({
          message: 'Передан невалидный id карточки.',
        });
      }
      return res.status(ERROR_500).send({
        message: 'На сервере произошла ошибка.',
      });
    });
};
