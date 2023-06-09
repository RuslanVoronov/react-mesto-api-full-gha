const JWT = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // const authorization = req.cookies.token;
  const authorization = req.cookies.cookie;
  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;

  try {
    payload = JWT.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
