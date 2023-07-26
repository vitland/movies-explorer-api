const router = require('express').Router();
const { addMovieValidation, removeMovieValidation } = require('../utils/validation');
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', addMovieValidation, addMovie);
router.delete('/:_id', removeMovieValidation, removeMovie);

module.exports = router;
