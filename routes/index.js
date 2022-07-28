const express = require('express');
// const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('../utils/errorcodes/not-found-error');

const app = express();
const { isAuthorized } = require('../middlewares/auth');
// const { login, createUser } = require('../controllers/users');
const routesUser = require('./users');
const routesMovies = require('./movies');
// const { LinksRegExp } = require('../utils/all-reg-exp');

app.use('/api/users', isAuthorized, routesUser);
app.use('/api/movies', isAuthorized, routesMovies);

// app.post('/api/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email({ minDomainSegments: 2, tlds:
// { allow: ['com', 'net', 'ru'] } }),
//     password: Joi.string().required(),
//   }),
// }), login);
// app.post('/api/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(LinksRegExp),
//     email: Joi.string().required().email({ minDomainSegments: 2, tlds:
// { allow: ['com', 'net', 'ru'] } }),
//     password: Joi.string().required(),
//   }),
// }), createUser);
app.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = app;
