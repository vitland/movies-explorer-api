const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { LoginError } = require('../errors/loginError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "Имя" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    email: {
      type: String,
      validate: {
        validator: (str) => validator.isEmail(str),
        message: 'Некорректный Email',
      },
      required: [true, 'Поле "Email" должно быть заполнено'],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
  },
  {
    statics: {
      async findByEmail(email, password) {
        const user = await this.findOne({ email }).select('+password');
        if (!user) {
          throw new LoginError('Неправильный логин или пароль');
        }
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
          throw new LoginError('Неправильный логин или пароль');
        }
        return user;
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
