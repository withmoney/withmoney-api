const { createTable, dropTable, addConstraint } = require('../utils/helpers/migrationsHelpers');

module.exports = {
  up: createTable('Transactions', Sequelize => ({
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
    addConstraint(queryInterface, 'Transactions', {
      field: 'accountId',
      name: 'fk_accounts_transation',
      tableName: 'Accounts',
    })
  )),
  down: dropTable('Transactions'),
};
