const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Transactions', Sequelize => ({
    accountId: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    value: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    type: {
      type: Sequelize.ENUM('in', 'out'),
    },
    isPaid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    transationDate: {
      type: Sequelize.DATEONLY,
    },
  }), queryInterface => (
    migrationActions.addConstraint(queryInterface, 'Transactions', {
      field: 'accountId',
      name: 'fk_accounts_transation',
      tableName: 'Accounts',
    })
  )),
  down: migrationActions.dropTable('Transactions'),
};
