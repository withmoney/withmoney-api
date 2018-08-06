module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    name: DataTypes.STRING,
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    type: DataTypes.ENUM('in', 'out'),
    isPaid: DataTypes.BOOLEAN,
    transactionDate: DataTypes.DATEONLY,
  }, {});
  Transactions.associate = ({ Accounts, Users, Categories }) => {
    Transactions.belongsTo(Users);
    Transactions.belongsTo(Accounts);
    Transactions.belongsTo(Categories);
  };
  return Transactions;
};
