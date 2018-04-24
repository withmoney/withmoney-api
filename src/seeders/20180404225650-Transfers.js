module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Transfers', [
    {
      value: 10,
      accountFromId: 1,
      accountToId: 2,
      transferDate: new Date('2018-04-01'),
      createdAt: new Date('2018-04-01'),
      updatedAt: new Date('2018-04-01'),
    },
    {
      value: 10,
      accountFromId: 2,
      accountToId: 1,
      transferDate: new Date('2018-04-01'),
      createdAt: new Date('2018-04-01'),
      updatedAt: new Date('2018-04-01'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Transfers', null, {}),
};
