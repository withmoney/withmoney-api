import { cryptPassword } from 'fastexpress';
import config from '../../config/envs';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
  }, { });

  Users.beforeCreate(cryptPassword(config.BCRYPT_SALT));
  Users.beforeUpdate(cryptPassword(config.BCRYPT_SALT));

  Users.associate = (models) => {
    Users.hasMany(models.Accounts);
  };
  return Users;
};
