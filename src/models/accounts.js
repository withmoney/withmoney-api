module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    type: DataTypes.ENUM('wallet', 'investing', 'checking_account'),
    initalValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  }, {});
  Accounts.associate = (models) => {
    Accounts.belongsTo(models.Users);
  };
  return Accounts;
};
