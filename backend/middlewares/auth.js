const JWT = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const authorization = req.cookies.token;
  const { authorization } = req.headers;
  // if (!authorization) 
  console.log(authorization)
  if (!authorization || !authorization.startsWith('Bearer ')){
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  console.log('ЗАЛОГИНЕН')
  
  const token = authorization.replace('Bearer ', '');
  console.log(token)
  let payload;

  try {
    payload = JWT.verify(token, 'some-secret-key');
    // payload = JWT.verify(authorization, 'some-secret-key');
    console.log(payload)
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
