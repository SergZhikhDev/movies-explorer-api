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

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovie);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
router.post('/', JoiCreateMovieValidate, createMovie);

// удаляет сохранённый фильм по id
router.delete('/_id', JoiIdValidate, deleteMovie);

module.exports = router;
