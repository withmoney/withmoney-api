const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Accounts', Sequelize => ({
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
    migrationActions.addConstraint(queryInterface, 'Accounts', {
      field: 'userId',
      name: 'fk_users_account',
      tableName: 'Users',
    })
  )),
  down: migrationActions.dropTable('Accounts'),
};
