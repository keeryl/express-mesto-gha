const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const login = (req, res, next) => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().custom((value, helper) => {
        if (!validator.isEmail(value)) {
          return helper.error('string.notEmail');
        }
        return value;
      }).messages({
        'any.required': 'Не указан e-mail',
        'string.notEmail': 'Указан некорректный e-mail',
      }),
      password: Joi.number().required().integer().min(6)
        .messages({
          'any.required': 'Не указан пароль',
          'string.min': 'Пароль должен быть не менее 6 символов',
        }),
    }),
  });
  return next();
};

const createUser = (req, res, next) => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value, helper) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          return helper.error('string.notURL');
        }
        return value;
      }).messages({
        'string.notURL': 'Указан некорректный адрес URL',
      }),
      email: Joi.string().required().email(),
      password: Joi.number().required().integer().min(6),
    }),
  });
  return next();
};

const createCard = (req, res, next) => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().custom((value, helper) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          return helper.error('string.notURL');
        }
        return value;
      }).messages({
        'string.notURL': 'Указан некорректный адрес URL',
      }),
    }),
  });
  return next();
};

const validateUserId = (req, res, next) => {
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  });
  return next();
};

const validateCardId = (req, res, next) => {
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  });
  return next();
};

const updateUserProfile = (req, res, next) => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  });
  return next();
};

const updateUserAvatar = (req, res, next) => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().custom((value, helper) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          return helper.error('string.notURL');
        }
        return value;
      }).messages({
        'string.NotURL': 'Указан некорректный адрес URL',
      }),
    }),
  });
  return next();
};

module.exports = {
  login,
  createUser,
  createCard,
  validateUserId,
  validateCardId,
  updateUserProfile,
  updateUserAvatar,
};
