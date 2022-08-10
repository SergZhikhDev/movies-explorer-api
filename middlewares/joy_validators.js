const { celebrate, Joi } = require('celebrate');

const StringJoiValidate = Joi.string().required();
const NumberJoiValidate = Joi.number().required();
const LinkJoiValidate = Joi.string().required().pattern(/^http(s|)(:|)\/\/(www.|)((\w+|\d+)(-|\.))+[a-z]{2,3}(\S+|)(#| +|)$/i);
const EmailJoiValidate = Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } });
const IdJoiValidate = Joi.string().hex().length(24);

module.exports.JoiLoginValidate = celebrate({
  body: Joi.object().keys({
    email: EmailJoiValidate,
    password: StringJoiValidate,
  }),
});

module.exports.JoiCreateUserValidate = celebrate({
  body: Joi.object().keys({
    name: StringJoiValidate.min(2).max(30),
    email: EmailJoiValidate,
    password: StringJoiValidate,
  }),
});

module.exports.JoiProfileValidate = celebrate({
  body: Joi.object().keys({
    email: EmailJoiValidate,
    name: StringJoiValidate,

  }),
});

module.exports.JoiIdValidate = celebrate({
  params: Joi.object().keys({
    id: IdJoiValidate,
  }),
});

module.exports.JoiCreateMovieValidate = celebrate({
  body: Joi.object().keys({
    country: StringJoiValidate,
    director: StringJoiValidate,
    duration: NumberJoiValidate,
    year: StringJoiValidate,
    description: StringJoiValidate,
    image: LinkJoiValidate,
    trailerLink: LinkJoiValidate,
    thumbnail: LinkJoiValidate,
    movieId: NumberJoiValidate,
    nameRU: StringJoiValidate,
    nameEN: StringJoiValidate,
  }),
});
