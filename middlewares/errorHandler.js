module.exports.errorHandler = (err, req, res, next) => {
  console.log(err.stack || err);
  const status = err.statusCode || 500;
  res.status(status).send({
    message: err.message,
    err,
  });
};
