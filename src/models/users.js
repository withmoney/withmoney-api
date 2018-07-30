/* eslint no-param-reassign: "off" */
import bcrypt from 'bcrypt';
import config from '../../config/envs';

const cryptPassword = user => bcrypt.hash(user.password, bcrypt.genSaltSync(config.BCRYPT_SALT))
  .then((hash) => {
    user.password = hash;
  })
  .catch((err) => {
    throw new Error(err);
  });

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { });

  Users.beforeCreate(cryptPassword);
  Users.beforeUpdate(cryptPassword);

  Users.associate = (models) => {
    Users.hasMany(models.Accounts);
  };
  return Users;
};
