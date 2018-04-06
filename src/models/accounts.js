'use strict';
module.exports = (sequelize, DataTypes) => {
  var Accounts = sequelize.define('Accounts', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    type: DataTypes.ENUM('wallet', 'investing', 'checking_account'),
    initalValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  }, {});
  Accounts.associate = function(models) {
    Accounts.belongsTo(models.Users);
  };
  return Accounts;
};
