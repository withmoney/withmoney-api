module.exports = (sequelize, DataTypes) => {
  const Transfers = sequelize.define('Transfers', {
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    transferDate: DataTypes.DATEONLY,
  }, {});
  Transfers.associate = ({ Accounts, Users }) => {
    Transfers.belongsTo(Accounts, { as: 'AccountFrom' });
    Transfers.belongsTo(Accounts, { as: 'AccountTo' });
    Transfers.belongsTo(Users);
  };
  return Transfers;
};
