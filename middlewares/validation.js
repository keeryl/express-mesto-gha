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
  next();
};

const createUser = (req, res, next) => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(18),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.number().required().integer().min(6),
    }),
  });
  next();
};

module.exports = {
  login,
  createUser,
};
