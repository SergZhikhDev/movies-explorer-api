const { ERRORS } = require('../utils/config');

const NotFoundError = require('../utils/errorcodes/not-found-error');

module.exports = (req, res, next) => next(new NotFoundError(ERRORS.INCORRECT_REQUEST));
