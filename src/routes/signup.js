const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { createUserInfoValidation } = require('../utils/validation');

router.post('/', createUserInfoValidation, createUser);
module.exports = router;
