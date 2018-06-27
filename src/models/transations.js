module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    name: DataTypes.STRING,
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    type: DataTypes.ENUM('in', 'out'),
    isPaid: DataTypes.BOOLEAN,
    transationDate: DataTypes.DATEONLY,
  }, {});
  Transactions.associate = (models) => {
    Transactions.belongsTo(models.Accounts);
  };
  return Transactions;
};
