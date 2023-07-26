require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const limiter = require('./utils/limiter');
const router = require('./routes');
const { PORT, MONGODB } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');

const app = express();

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  autoIndex: true,
}).then(() => console.log('mongo UP')).catch((err) => console.log(err));

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors({ origin: true, credentials: true }));
app.use('/', router);
app.use(errorLogger);
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
