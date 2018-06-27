module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('wallet', 'investing', 'checking_account'),
    initalValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  }, {});
  Accounts.associate = ({ Users }) => {
    Accounts.belongsTo(Users);
  };
  return Accounts;
};
