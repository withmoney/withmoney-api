const { createTable, dropTable, addConstraint } = require('../utils/helpers/migrationsHelpers');

module.exports = {
  up: createTable('Accounts', Sequelize => ({
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM('wallet', 'investing', 'checking_account'),
    },
    initalValue: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
  }), queryInterface => (
    addConstraint(queryInterface, 'Accounts', {
      field: 'userId',
      name: 'fk_users_account',
      tableName: 'Users',
    })
  )),
  down: dropTable('Accounts'),
};
