'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      {
        accountId: 1,
        name: 'Lanche na Sonia',
        value: 30.90,
        type: 'out',
        isPaid: true,
        transationDate: new Date('2018-04-01'),
        createdAt: new Date('2018-04-01'),
        updatedAt: new Date('2018-04-01'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
