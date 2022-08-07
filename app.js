require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const { limiter } = require('./utils/rateLimiter/rateLimiter');
const { mongo } = require('./utils/config');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(mongo);
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
  console.log(`App listening on port ${PORT} / Приложение запущено, используется порт ${PORT}.`);
});
