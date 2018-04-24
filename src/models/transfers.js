module.exports = (sequelize, DataTypes) => {
  const Transfers = sequelize.define('Transfers', {
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    accountFromId: DataTypes.INTEGER,
    accountToId: DataTypes.INTEGER,
    transferDate: DataTypes.DATEONLY,
  }, {});
  Transfers.associate = ({ Accounts }) => {
    Transfers.belongsTo(Accounts, { as: 'accountFrom' });
    Transfers.belongsTo(Accounts, { as: 'accountTo' });
  };
  return Transfers;
};
