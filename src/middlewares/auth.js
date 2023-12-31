const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const { ForbiddenError } = require('../errors/forbiddenError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ForbiddenError('Нужна авторизация');
  }
  const payload = jwt.verify(token, SECRET);
  if (!payload) {
    throw new ForbiddenError('Нужна авторизация');
  }
  req.user = payload;
  next();
};

module.exports = { auth };
