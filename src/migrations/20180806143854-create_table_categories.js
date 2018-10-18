const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Categories', Sequelize => ({
    name: {
      type: Sequelize.STRING,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('in', 'out'),
    },
  }), async (queryInterface, Sequelize) => {
    await migrationActions.addConstraint(queryInterface, 'Categories', {
      field: 'UserId',
      name: 'fk_user_categories',
      tableName: 'Users',
    });
    await queryInterface.addColumn('Transactions', 'CategoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'AccountId',
    });
  }),
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'CategoryId');
    await queryInterface.dropTable('Categories');
  },
};
