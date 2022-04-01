const {
  ERROR_400,
  ERROR_401,
  // ERROR_403,
  ERROR_404,
  // ERROR_409,
} = require('./constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_404;
  }
}

module.exports = {
  ConflictError,
  NotFoundError,
  AuthError,
};
