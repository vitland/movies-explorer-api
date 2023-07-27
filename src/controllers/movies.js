const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/notFoundError');
const { ForbiddenError } = require('../errors/forbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movies = await Movie.find({ owner: _id });
    if (!movies) {
      throw new NotFoundError('Фильмы не найдены');
    }
    return res.send(movies);
  } catch (e) {
    return next(e);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movie = await Movie.create({ ...req.body, owner: _id });
    return res.send(movie);
  } catch (e) {
    return next(e);
  }
};

const removeMovie = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;
    const movie = await Movie.findById(_id);
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    if (userId !== movie.owner.toString()) {
      throw new ForbiddenError('Нельзя удалить фильм');
    }
    await movie.deleteOne();
    return res.send({ data: movie });
  } catch (e) {
    return next(e);
  }
};

module.exports = { getMovies, addMovie, removeMovie };
