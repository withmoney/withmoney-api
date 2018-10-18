const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.dropTable('Transfers'),
  down: () => {},
};
