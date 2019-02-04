const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Transfers', Sequelize => ({
    value: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    accountFromId: {
      type: Sequelize.INTEGER,
    },
    accountToId: {
      type: Sequelize.INTEGER,
    },
    transferDate: {
      type: Sequelize.DATEONLY,
    },
  }), async (queryInterface) => {
    await migrationActions.addConstraint(queryInterface, 'Transfers', {
      field: 'accountFromId',
      name: 'fk_transfers_account_from',
      tableName: 'Accounts',
    });
    await migrationActions.addConstraint(queryInterface, 'Transfers', {
      field: 'accountToId',
      name: 'fk_transfers_account_to',
      tableName: 'Accounts',
    });
  }),
  down: migrationActions.dropTable('Transfers'),
};
