const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { ERRORS } = require('../utils/config');

const BadRequestError = require('../utils/errorcodes/bad-request-error');
const NotFoundError = require('../utils/errorcodes/not-found-error');
const NotUniqueEmailError = require('../utils/errorcodes/not-unique-email');
const NotDataError = require('../utils/errorcodes/not-pass-or-email');

const {
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  secretKey,
} = require('../utils/config');

const {
  CORRECT_CODE,
  CREATE_CODE,
} = require('../utils/correctcodes/correctcodes');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.status(CORRECT_CODE).send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERRORS.USER.NOT_FOUND);
      }
      return res.status(CORRECT_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERRORS.USER.INCORRECT_UPDATE));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new NotUniqueEmailError());
      }
      next(err);
    })
    .catch(next);
};

module.exports.createUser = ((req, res, next) => {
  const {
    name, password,
  } = req.body;
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(CREATE_CODE).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERRORS.USER.INCORRECT_CREATE));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new NotUniqueEmailError());
      }
      next(err);
    })
    .catch(next);
});

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new NotDataError(ERRORS.USER.INCORRECT_AUTH);
      }
      return jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
    })
    .then((token) => {
      res.send({ token });
    })
    .catch(next);
};
