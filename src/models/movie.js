const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = require('mongoose');

const movieSchema = new Schema({
  country: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
  },
  director: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
  },
  duration: {
    type: Number,
    require: [true, 'Поле должно быть заполнено'],
  },
  year: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
  },
  description: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
  },
  image: {url: {
      type: String,
      require: [true, 'Поле должно быть заполнено'],
    }
  },
  trailerLink: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
    validate: {
      validator: (str) => validator.isURL(str),
    },
  },
  thumbnail: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Пользователь не найден'],
  },
  nameRU: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
  },
  nameEN: {
    type: String,
    require: [true, 'Поле должно быть заполнено'],
  },
  id: {
    type: Number,
    require: [true, 'Поле должно быть заполнено'],
  },
});

module.exports = mongoose.model('film', movieSchema);
