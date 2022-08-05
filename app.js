require('dotenv').config();
const express = require('express');
// const rateLimit = require('express-rate-limit');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const { limiter } = require('./utils/rateLimiter/rateLimiter');

const { PORT = 3000 } = process.env;

const app = express();
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // за 15 минут
//   max: 100, // можно совершить максимум 100 запросов с одного IP
// });
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');
app.use(limiter);
app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} / Приложение запущено, используется порт ${PORT}.`);
});
