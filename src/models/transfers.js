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
  Transfers.associate = (models) => {
    Transfers.belongsTo(models.Accounts);
  };
  return Transfers;
};
