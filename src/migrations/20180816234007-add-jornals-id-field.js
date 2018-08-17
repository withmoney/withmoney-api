const { addConstraint } = require('../utils/helpers/migrationsHelpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Transactions', 'JournalId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      after: 'CategoryId',
    });

    await addConstraint(queryInterface, 'Transactions', {
      field: 'JournalId',
      name: 'fk_journals_transactions',
      tableName: 'Journals',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'JournalId');
  },
};
