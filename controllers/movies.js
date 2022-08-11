const Movie = require('../models/movie');

const { ERRORS } = require('../utils/config');

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
  Movie.create({
    ...req.body,
    owner: req.user.id,
  })
    .then((movie) => {
      res.status(CREATE_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERRORS.MOVIE.NCORRECT_DATA));
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
        next(new NotFoundError(ERRORS.MOVIE.NOT_FOUND));
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user.id)) {
        throw new BadRequireToken(ERRORS.MOVIE.NOT_ENOUGH_RIGHTS);
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => {
      res.status(CORRECT_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERRORS.MOVIE.INCORRECT_ID));
      }
      next(err);
    });
};
