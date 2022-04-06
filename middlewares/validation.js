const { Joi, Segments } = require('celebrate');
const validator = require('validator');

const loginSchema = {
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
};

const UserSchema = {
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
};

const CardSchema = {
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
};

const UserIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
};

const CardIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
};

const UserProfileSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const UserAvatarSchema = {
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
};

module.exports = {
  UserSchema,
  loginSchema,
  UserIdSchema,
  UserProfileSchema,
  UserAvatarSchema,
  CardIdSchema,
  CardSchema,
};
