const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT, 10),
};
