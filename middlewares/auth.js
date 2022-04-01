const jwt = require('bcrypt');

const {
  JWT_SECRET,
} = require('../utils/constants');

const {
  AuthError,
} = require('../utils/customErrors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    err = new AuthError('Необходима авторизация');
    next(err);
  }

  req.user = payload;

  next();
};
