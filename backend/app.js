const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/log');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://mesto15.nomoredomains.rocks',
  'http://mesto15.nomoredomains.rocks',
  'https://api.mesto15.nomoredomains.rocks',
  'http://api.mesto15.nomoredomains.rocks',
  'http://localhost:3000',
  'http://localhost:3001',
  '*',
];

mongoose.connect('mongodb://127.0.0.1:27017/mesto');

const app = express();
app.options('*', cors({
  origin: allowedCors,
  credentials: true,
}));
app.use(bodyParse.json());
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ваш сервер был запущен на порту : ${PORT}`);
});
