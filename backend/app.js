const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.json());
app.use(cors({
  origin: allowedCors,
  credentials: true,
}))
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ваш сервер был запущен на порту : ${PORT}`);
});
