const { celebrate, Joi } = require('celebrate');

const JoiValidate = Joi.string().required();
const LinkJoiValidate = Joi.string().required().pattern(/^http(s|)(:|)\/\/(www.|)((\w+|\d+)(-|\.))+[a-z]{2,3}(\S+|)(#| +|)$/i);
const EmailJoiValidate = Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } });
const IdJoiValidate = Joi.string().hex().length(24);

module.exports.JoiLoginValidate = celebrate({
  body: Joi.object().keys({
    email: EmailJoiValidate,
    password: JoiValidate,
  }),
});

module.exports.JoiCreateUserValidate = celebrate({
  body: Joi.object().keys({
    name: JoiValidate.min(2).max(30),
    email: EmailJoiValidate,
    password: JoiValidate,
  }),
});

module.exports.JoiProfileValidate = celebrate({
  body: Joi.object().keys({
    email: EmailJoiValidate,
    password: JoiValidate,
    name: JoiValidate,

  }),
});

module.exports.JoiIdValidate = celebrate({
  body: Joi.object().keys({
    movieId: IdJoiValidate,
  }),
});

module.exports.JoiCreateMovieValidate = celebrate({
  body: Joi.object().keys({
    country: JoiValidate,
    director: JoiValidate,
    duration: JoiValidate,
    year: JoiValidate,
    description: JoiValidate,
    image: LinkJoiValidate,
    trailerLink: LinkJoiValidate,
    thumbnail: LinkJoiValidate,
    movieId: JoiValidate,
    nameRU: JoiValidate,
    nameEN: JoiValidate,
  }),
});
