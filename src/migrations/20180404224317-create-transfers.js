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
    // await queryInterface.addConstraint('Transfers', ['accountFromId'], {
    //   type: 'foreign key',
    //   name: 'fk_transfers_account_from',
    //   references: { // Required field
    //     table: 'Accounts',
    //     field: 'id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'no action',
    // });

    // await queryInterface.addConstraint('Transfers', ['accountToId'], {
    //   type: 'foreign key',
    //   name: 'fk_transfers_account_to',
    //   references: { // Required field
    //     table: 'Accounts',
    //     field: 'id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'no action',
    // });
  }),
  down: migrationActions.dropTable('Transfers'),
};
