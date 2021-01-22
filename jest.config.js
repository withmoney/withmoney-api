process.env.SECRET_SALT = '8';
process.env.SECRET_KEY = 'lessiknowitsbetter';

process.env.EMAIL_HOST = 'stmp.withmoney.test';
process.env.EMAIL_PORT = '1234';
process.env.EMAIL_USER = 'davidcosta';
process.env.EMAIL_PASSWORD = '123456';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
