const router = require('express').Router();
const { signOutUser } = require('../controllers/users');

router.delete('/', signOutUser);
module.exports = router;
