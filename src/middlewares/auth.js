const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Error('Нужна авторизация');
  }
  const payload = jwt.verify(token, SECRET);
  if (!payload) {
    throw new Error('Нужна авторизация');
  }
  req.user = payload;
  next();
};

module.exports = { auth };
