'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.Accounts);
  };
  return Users;
};
