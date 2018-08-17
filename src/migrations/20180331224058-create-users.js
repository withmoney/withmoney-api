const { createTable, dropTable } = require('../utils/helpers/migrationsHelpers');

module.exports = {
  up: createTable('Users', Sequelize => ({
    name: {
      type: Sequelize.STRING,
    },
  })),
  down: dropTable('Users'),
};
