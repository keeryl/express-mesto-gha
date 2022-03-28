const User = require('../models/user');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500,
} = require('../utils/constants');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ ...users }))
    .catch(() => res.status(ERROR_500).send({ message: 'На сервере произошла ошибка.' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_404).send({
          message: 'Пользователь с указанным id не найден.',
        });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_400).send({
          message: 'Передан невалидный id пользователя.',
        });
      }
      return res.status(ERROR_500).send({
        message: 'На сервере произошла ошибка.',
      });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, '+password')
    .then(user => {
      if(!user) {
        throw new Error('Такого пользователя не существует');
      }
      return bcrypt.compare(password, user.password)
    })
    .then(isValid => {
      if (!isValid) {
        throw new Error('Неправильный логин или пароль');
      }
      const token = jwt.sign({ user._id }, 'SECRET_CODE');
      res.send({ jwt: token });
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({email})
    .then(user => {
      if(user) {
        throw new Error('Пользователь с таким e-mail уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then(hash => {
      return User.create({ name, about, avatar, email, password: hash });
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      return res.status(ERROR_500).send({
        message: 'На сервере произошла ошибка.',
      });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(ERROR_404).send({
          message: 'Пользователь с указанным id не найден.',
        });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_400).send({
          message: 'Передан невалидный id пользователя.',
        });
      }
      return res.status(ERROR_500).send({
        message: 'На сервере произошла ошибка.',
      });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(ERROR_404).send({
          message: 'Пользователь с указанным id не найден.',
        });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_400).send({
          message: 'Передан невалидный id пользователя.',
        });
      }
      return res.status(ERROR_500).send({
        message: 'На сервере произошла ошибка.',
      });
    });
};
