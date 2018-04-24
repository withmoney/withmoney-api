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
  Accounts.associate = ({ Transfers, Users }) => {
    Accounts.belongsTo(Users);
    // Accounts.hasMany(models.Transfers, { foreignKey: 'accountFrom', sourceKey: 'id' });
    // Accounts.hasMany(models.Transfers, { foreignKey: 'accountToId', sourceKey: 'id' });

    Transfers.belongsTo(Accounts, { as: 'firstGuy', foreignKey: 'accountFrom' });
    Transfers.belongsTo(Accounts, { as: 'secondGuy', foreignKey: 'accountToId' });
  };
  return Accounts;
};
