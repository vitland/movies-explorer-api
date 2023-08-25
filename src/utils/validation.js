const { celebrate, Joi } = require('celebrate');

const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required().pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??[-+=&;%@.\w_]*#?\w*)?)/,
    ),
    thumbnail: Joi.string().required(),
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const removeMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required()
  }),
});
const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email().min(2),
  }),
});
const createUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2),
    password: Joi.string().required().min(8),
  }),
});
const signinInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  addMovieValidation,
  removeMovieValidation,
  updateUserInfoValidation,
  createUserInfoValidation,
  signinInfoValidation,
};
