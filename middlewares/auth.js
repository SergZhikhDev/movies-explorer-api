const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { ERRORS } = require('../utils/config');

const NotDataError = require('../utils/errorcodes/not-pass-or-email');

const {
  secretKey,
} = require('../utils/config');

const isAuthorized = ((req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new NotDataError(ERRORS.AUTHORIZATION_REQUIRED);
  }
  try {
    const token = () => jwt.verify(authorization.replace('Bearer ', ''), secretKey);
    const payload = token();
    User.findOne({ id: payload._id }).then((user) => {
      if (!user) {
        throw new NotDataError(ERRORS.AUTHORIZATION_REQUIRED);
      }
    });
    req.user = payload;
  } catch (err) {
    throw new NotDataError(ERRORS.AUTHORIZATION_REQUIRED);
  }

  next();
});

module.exports = { isAuthorized };
