const mongoose = require('mongoose');

const {
  posterLinkValidator,
  trailerLinkValidator,
  thumbnailLinkValidator,
} = require('../validators/validators');

const movieSchema = new mongoose.Schema({
  // страна создания фильма.
  country: {
    type: String,
    required: true,
  },

  // режиссёр фильма.
  director: {
    type: String,
    required: true,
  },

  // длительность фильма
  duration: {
    type: Number,
    required: true,
  },

  //  год выпуска фильма.
  year: {
    type: String,
    required: true,
  },

  // описание фильма.
  description: {
    type: String,
    required: true,
  },

  // ссылка на постер к фильму
  image: {
    type: String,
    required: true,
    validate: posterLinkValidator,
  },
  // ссылка на трейлер фильма.
  trailerLink: {
    type: String,
    required: true,
    validate: trailerLinkValidator,
  },

  // ссылка на миниатюрное изображение постера к фильму.
  thumbnail: {
    type: String,
    required: true,
    validate: thumbnailLinkValidator,
  },

  // id пользователя, который сохранил фильм.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  //  id фильма, который содержится в ответе сервиса MoviesExplorer.
  movieId: {
    type: Number,
    required: true,
  },

  // название фильма на русском языке.
  nameRU: {
    type: String,
    required: true,
  },

  // название фильма на английском языке.
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
