import jwt from 'jsonwebtoken';
import config from '../config/envs';

const getToken = (req) => {
  if (typeof req.body.token !== 'undefined') {
    return req.body.token;
  } else if (typeof req.query.token !== 'undefined') {
    return req.query.token;
  } else if (typeof req.headers.token !== 'undefined') {
    return req.headers.token;
  }

  return null;
};

const checkAuth = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    res.status(403).send({
      message: 'No token provided',
    });
  } else {
    jwt.verify(token, config.JWT_ENCRYPTION, (err, decoded) => {
      if (err) {
        res.status(500).send({
          message: 'Invalid auth token provided.',
        });
      } else {
        res.user = decoded;

        next();
      }
    });
  }
};

export default {
  checkAuth,
};
