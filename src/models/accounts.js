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
    // Accounts.hasMany(models.Transfers, { foreignKey: 'accountIdFrom', sourceKey: 'id' });
    // Accounts.hasMany(models.Transfers, { foreignKey: 'accountIdTo', sourceKey: 'id' });

    Transfers.belongsTo(Accounts, { as: 'firstGuy', foreignKey: 'accountIdFrom' });
    Transfers.belongsTo(Accounts, { as: 'secondGuy', foreignKey: 'accountIdTo' });
  };
  return Accounts;
};
