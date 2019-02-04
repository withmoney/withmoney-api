const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.dropTable('Transfers'),
  down: migrationActions.createTable('Transfers', Sequelize => ({
    UserId: {
      type: Sequelize.INTEGER,
    },
    value: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    AccountFromId: {
      type: Sequelize.INTEGER,
    },
    AccountToId: {
      type: Sequelize.INTEGER,
    },
    transferDate: {
      type: Sequelize.DATEONLY,
    },
  })),
};
