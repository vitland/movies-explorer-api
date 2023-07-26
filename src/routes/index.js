const router = require('express').Router();
const { auth } = require('../middlewares/auth');
router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));

router.use(auth);
router.use('/signout', require('./signout'));
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }));

module.exports = router;
