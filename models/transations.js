'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transactions = sequelize.define('Transactions', {
    accountId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    type: DataTypes.ENUM('in', 'out'),
    isPaid: DataTypes.BOOLEAN,
    transationDate: DataTypes.DATEONLY,
  }, {});
  Transactions.associate = function(models) {
    Transactions.belongsTo(models.Accounts);
  };
  return Transactions;
};