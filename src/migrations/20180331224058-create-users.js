const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Users', Sequelize => ({
    name: {
      type: Sequelize.STRING,
    },
  })),
  down: migrationActions.dropTable('Users'),
};
