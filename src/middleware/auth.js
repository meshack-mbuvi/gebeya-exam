const jwt = require('jsonwebtoken');

export const authentication = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token =
    req.query['token'] ||
    req.headers['authorization'] ||
    req.headers.authorization['token'];

  const { url } = req;

  // signup and login endpoints should not be secured
  if (url === '/users/signup' || url === '/users/login') {
    return next();
  }

  if (token && token.split(' ')[0] === 'Bearer') {
    jwt.verify(token.split(' ')[1], secretKey, (error, user) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          res.send({
            error: {
              status: 401,
              message: 'Token has already expired',
            },
          });
        }

        return res.status(401).send({
          error: {
            status: 401,
            code: 'AUT_01',
            message: errors.AUT_01,
            field: 'email/password',
          },
        });
      } else {
        req['user'] = user;
        return next();
      }
    });
  } else {
    return res.status(401).send({
      error: {
        status: 401,
        message: 'Please provide your auth jwt.',
      },
    });
  }
};
