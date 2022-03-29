const {
  ERROR_409,
  ERROR_500,
} = require('./utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  console.log(err.stack || err);
  const status = err.statusCode || ERROR_500;
  if (err.code === 11000) {
    res.status(ERROR_409).send({
      message: err.message,
      err,
    });
  }
  res.status(status).send({
    message: err.message,
    err,
  });
};
