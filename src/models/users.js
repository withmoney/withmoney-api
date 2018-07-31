import { cryptPassword } from '../utils/model';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
  }, { });

  Users.beforeCreate(cryptPassword);
  Users.beforeUpdate(cryptPassword);

  Users.associate = (models) => {
    Users.hasMany(models.Accounts);
  };
  return Users;
};
