import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/envs';

export const getUserByEmail = Model => email => Model.findOne({ where: { email } });

export const authenticate = Model => params => Model.findOne({
  where: {
    email: params.email,
  },
  raw: true,
}).then((user) => {
  if (!user) {
    throw new Error('Authentication failed. User not found.');
  }

  if (!user.enabled) {
    throw new Error('Authentication failed. User are not enabled.');
  }

  if (!bcrypt.compareSync(params.password, user.password)) {
    throw new Error('Authentication failed. Wrong password.');
  }

  const payload = {
    name: user.name,
    email: user.email,
    id: user.id,
    time: new Date(),
  };

  const token = jwt.sign(payload, config.JWT_ENCRYPTION, {
    expiresIn: config.JWT_EXPIRATION,
  });

  return {
    token,
    payload,
  };
});
