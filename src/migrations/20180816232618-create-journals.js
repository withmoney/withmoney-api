const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Journals', Sequelize => ({
    UserId: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.ENUM('transfers'),
    },
  }), queryInterface => (
    migrationActions.addConstraint(queryInterface, 'Journals', {
      field: 'UserId',
      name: 'fk_journal_transactions',
      tableName: 'Users',
    })
  )),
  down: migrationActions.dropTable('Journals'),
};
