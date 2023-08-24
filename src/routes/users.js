const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserInfoValidation } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', updateUserInfoValidation, updateUser);

module.exports = router;
