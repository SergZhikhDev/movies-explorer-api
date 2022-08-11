const { NODE_ENV, JWT_SECRET, MONGODB } = process.env;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SECRET_KEY = 'very_secret';
const SALT_ROUNDS = 10;

const mongo = NODE_ENV === 'production' ? MONGODB : 'mongodb://127.0.0.1:27017/moviesdb';
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY;

const ERRORS = {
  AUTHORIZATION_REQUIRED: 'Необходима авторизация',
  MANY_REQUEST: 'Слишком много запросов, повторите попытку позже.',
  INCORRECT_REQUEST: 'Ресурс не найден. Проверьте URL и метод запроса',

  MOVIE: {
    INCORRECT_DATA: 'Переданы некорректные данные при сохранении фильма.',
    NOT_FOUND: 'Фильм не найден.',
    NOT_ENOUGH_RIGHTS: 'У вас недостаточно прав доступа, удалить можно только фильм добавленный вами',
    INCORRECT_ID: 'Передан некорректный id фильма.',
  },

  USER: {
    NOT_FOUND: 'Пользователь не найден.',
    INCORRECT_UPDATE: 'Переданы некорректные данные при обновлении профиля.',
    INCORRECT_CREATE: 'Переданы некорректные данные при создании пользователя.',
    INCORRECT_AUTH: 'Неправильные email или пароль',
  },
};

module.exports = {
  mongo,
  secretKey,
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  ERRORS,
};
