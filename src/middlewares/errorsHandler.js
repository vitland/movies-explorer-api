const { isCelebrateError } = require('celebrate');

const errorsHandler = (err, req, res, next) => {
  if (err.name === 'NotFound') {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === 'LoginError') {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === 'ForbiddenError') {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }
  if (isCelebrateError(err)) {
    const error = err.details.get('body') ? err.details.get('body') : err.details.get('params');
    const { details: [{ message }] } = error;
    return res.status(400).send({ message });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
  }

  return res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
};

module.exports = { errorsHandler };
