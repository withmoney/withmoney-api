module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Accounts', [
    {
      userId: 1,
      name: 'Banco do Brasil',
      type: 'checking_account',
      initalValue: 61.52,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      name: 'Banco Neon',
      type: 'checking_account',
      initalValue: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      name: 'Banco Inter',
      type: 'checking_account',
      initalValue: 505.18,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      name: 'monetus',
      type: 'investing',
      initalValue: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      name: 'Carteira',
      type: 'wallet',
      initalValue: 650,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Accounts', null, {}),
};
