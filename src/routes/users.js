const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email().min(2)
        .max(30),
    }),
  }),
  updateUser,
);

module.exports = router;
