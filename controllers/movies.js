const Movie = require('../models/movie');

const BadRequestError = require('../utils/errorcodes/bad-request-error');
const NotFoundError = require('../utils/errorcodes/not-found-error');
const BadRequireToken = require('../utils/errorcodes/bad-require-token');

const {
  CREATE_CODE,
  CORRECT_CODE,
} = require('../utils/correctcodes/correctcodes');

module.exports.getMovie = (req, res, next) => {
  const owner = req.user.id;
  Movie.find({ owner })
    .then((movies) => res.status(CORRECT_CODE).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner = req.user._id,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATE_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError());
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user.id)) {
        throw new BadRequireToken();
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => {
      res.status(CORRECT_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
      }
      next(err);
    });
};
