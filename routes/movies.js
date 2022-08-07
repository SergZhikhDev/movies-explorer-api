const router = require('express').Router();

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  JoiCreateMovieValidate,
  JoiIdValidate,
} = require('../middlewares/joy_validators');

router.get('/', getMovie);

router.post('/', JoiCreateMovieValidate, createMovie);

router.delete('/:id', JoiIdValidate, deleteMovie);

module.exports = router;
