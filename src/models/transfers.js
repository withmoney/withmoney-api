module.exports = (sequelize, DataTypes) => {
  const Transfers = sequelize.define('Transfers', {
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    accountIdFrom: DataTypes.INTEGER,
    accountIdTo: DataTypes.INTEGER,
    transferDate: DataTypes.DATEONLY,
  }, {});
  Transfers.associate = ({ Accounts }) => {
    Transfers.belongsTo(Accounts, { foreignKey: 'id', sourceKey: 'accountIdFrom', as: 'accountsFrom' }); // not
    Transfers.belongsTo(Accounts, { foreignKey: 'id', sourceKey: 'accountIdTo' }); // not
    // Transfers.belongsTo(Accounts, { foreignKey: 'accountIdFrom', as: 'AccountsFrom' });
    // Transfers.belongsTo(Accounts, { foreignKey: 'accountIdTo' });
  };
  return Transfers;
};
