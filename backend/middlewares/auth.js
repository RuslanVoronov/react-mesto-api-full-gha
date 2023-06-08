const JWT = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // const authorization = req.cookies.token;
  const authorization = req.cookies.cookie;
  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;

  try {
    payload = JWT.verify(authorization, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
