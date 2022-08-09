const express = require('express');

const app = express();

const routesUser = require('./users');
const routesMovies = require('./movies');
const { login, createUser } = require('../controllers/users');
const notFoundPage = require('./404');
const { isAuthorized } = require('../middlewares/auth');
const { JoiLoginValidate, JoiCreateUserValidate } = require('../middlewares/joy_validators');

app.use('/api/users', isAuthorized, routesUser);
app.use('/api/movies', isAuthorized, routesMovies);

app.post('/api/signin', JoiLoginValidate, login);
app.post('/api/signup', JoiCreateUserValidate, createUser);

app.use('/api/', isAuthorized, notFoundPage);
module.exports = app;
