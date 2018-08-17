const { addConstraint } = require('../utils/helpers/migrationsHelpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UserIdDefinitions = {
      type: Sequelize.INTEGER,
      after: 'id',
    };

    await queryInterface.addColumn('Transactions', 'UserId', UserIdDefinitions);
    await queryInterface.addColumn('Transfers', 'UserId', UserIdDefinitions);

    await addConstraint(queryInterface, 'Transactions', {
      tableName: 'Users',
      field: 'UserId',
      name: 'fk_users_transactions',
    });
    await addConstraint(queryInterface, 'Transfers', {
      tableName: 'Users',
      field: 'UserId',
      name: 'fk_users_transfers',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'UserId');
    await queryInterface.removeColumn('Transfers', 'UserId');
  },
};
