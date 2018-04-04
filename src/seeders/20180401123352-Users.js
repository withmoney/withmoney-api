'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'David',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => (
        queryInterface.bulkDelete('Users', null, { truncate: true })
        .then(() => (
          queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
        ))
      ))
    }
};
