module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    CategoryId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    AccountId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    JournalId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00',
    },
    type: DataTypes.ENUM('in', 'out'),
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    transactionDate: DataTypes.DATEONLY,
  }, {});
  Transactions.associate = ({ Accounts, Users, Categories }) => {
    Transactions.belongsTo(Users);
    Transactions.belongsTo(Accounts);
    Transactions.belongsTo(Categories);
  };
  return Transactions;
};
