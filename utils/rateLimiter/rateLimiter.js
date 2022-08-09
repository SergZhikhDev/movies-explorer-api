const rateLimit = require('express-rate-limit');
const { ERRORS } = require('../config');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: ERRORS.MANY_REQUEST },
});
