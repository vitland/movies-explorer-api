const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { NotFoundError } = require('../errors/notFoundError');
const { SECRET } = require('../config');

const createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, name, password: hash });
    return res.status(201).send({ data: { name, email } });
  } catch (e) {
    return next(e);
  }
};
const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.send({ data: user });
  } catch (e) {
    next(e);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    res.send({ data: user });
  } catch (e) {
    next(e);
  }
};

const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email, password);
    const token = await jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
    res
      .cookie('jwt', token, { maxAge: 604800000, sameSite: true, httpOnly: true })
      .send({ message: 'Авторизирован' })
      .end();
  } catch (e) {
    next(e);
  }
};
const signOutUser = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
module.exports = {
  createUser,
  getUser,
  updateUser,
  signInUser,
  signOutUser,
};
