const { dropTable } = require('../utils/helpers/migrationsHelpers');

module.exports = {
  up: dropTable('Transfers'),
  down: () => {},
};
