const router = require('express').Router();
const { signInUser } = require('../controllers/users');
const { signinInfoValidation } = require('../utils/validation');

router.post('/', signinInfoValidation, signInUser);
module.exports = router;
