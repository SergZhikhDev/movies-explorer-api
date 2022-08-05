const express = require('express');

const app = express();
const NotFoundError = require('../utils/errorcodes/not-found-error');

const routesUser = require('./users');
const routesMovies = require('./movies');
const { login, createUser } = require('../controllers/users');
const { isAuthorized } = require('../middlewares/auth');
const { JoiLoginValidate, JoiCreateUserValidate } = require('../middlewares/joy_validators');

app.use('/api/users', isAuthorized, routesUser);
app.use('/api/movies', isAuthorized, routesMovies);

app.post('/api/signin', JoiLoginValidate, login);
app.post('/api/signup', JoiCreateUserValidate, createUser);

app.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = app;
