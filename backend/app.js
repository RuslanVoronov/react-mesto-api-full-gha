const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
// const cors = require('cors'); 
const errorHandler = require('./middlewares/errorHandler');
// Массив доменов, с которых разрешены кросс-доменные запросы
// const allowedCors = [
//   'https://praktikum.tk',
//   'http://praktikum.tk',
//   'localhost:3000',
//   'https://mesto15.nomoredomains.rocks'
// ];

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mesto');

const app = express();


// app.use(function (req, res, next) {
//   console.log(req.headers)
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   // проверяем, что источник запроса есть среди разрешённых 
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', "*");
//   }

//   next();
// });

// app.use(cors({
//   origin: allowedCors
// }
// //   {
// //   origin: allowedCors,
// //   credentials: true,
  
// //     "origin": "*",
// //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
// //     "preflightContinue": false,
// //     "optionsSuccessStatus": 204
  
// // }
// ))

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.json());

app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ваш сервер был запущен на порту : ${PORT}`);
});
