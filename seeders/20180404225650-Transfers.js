'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transfers', [
      {
        value: 10,
        accountIdFrom: 1,
        accountIdTo: 2,
        transferDate: new Date('2018-04-01'),
        createdAt: new Date('2018-04-01'),
        updatedAt: new Date('2018-04-01'),
      },
      {
        value: 10,
        accountIdFrom: 2,
        accountIdTo: 1,
        transferDate: new Date('2018-04-01'),
        createdAt: new Date('2018-04-01'),
        updatedAt: new Date('2018-04-01'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transfers', null, {});
  }
};
