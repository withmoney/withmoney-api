const { createTable, addConstraint, dropTable } = require('../utils/helpers/migrationsHelpers');

module.exports = {
  up: createTable('Journals', Sequelize => ({
    UserId: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.ENUM('transfers'),
    },
  }), queryInterface => (
    addConstraint(queryInterface, 'Journals', {
      field: 'UserId',
      name: 'fk_journal_transactions',
      tableName: 'Users',
    })
  )),
  down: dropTable('Journals'),
};
