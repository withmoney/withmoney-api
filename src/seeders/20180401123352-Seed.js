const user = {
  name: 'David Costa',
  email: 'davidcostadev@gmail.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const bancointer = {
  userId: null,
  name: 'Banco Inter',
  type: 'checking_account',
  initalValue: 505.18,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const carteira = {
  userId: null,
  name: 'Carteira',
  type: 'wallet',
  initalValue: 650,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const transactionOnInter = {
  accountId: null,
  name: 'Lanche na Sonia',
  value: 30.90,
  type: 'out',
  isPaid: true,
  transationDate: new Date('2018-04-01'),
  createdAt: new Date('2018-04-01'),
  updatedAt: new Date('2018-04-01'),
};

const transactionOnWallet = {
  accountId: null,
  name: 'Coxinha',
  value: 3.13,
  type: 'out',
  isPaid: true,
  transationDate: new Date('2018-04-01'),
  createdAt: new Date('2018-04-01'),
  updatedAt: new Date('2018-04-01'),
};

const transferOne = {
  value: 10,
  accountFromId: null,
  accountToId: null,
  transferDate: new Date('2018-04-01'),
  createdAt: new Date('2018-04-01'),
  updatedAt: new Date('2018-04-01'),
};
const transferTwo = {
  value: 10,
  accountFromId: null,
  accountToId: null,
  transferDate: new Date('2018-04-01'),
  createdAt: new Date('2018-04-01'),
  updatedAt: new Date('2018-04-01'),
};

module.exports = {
  up: async (queryInterface) => {
    const userId = await queryInterface.bulkInsert('Users', [user]);
    bancointer.userId = userId;
    carteira.userId = userId;

    const accountIdInter = await queryInterface.bulkInsert('Accounts', [bancointer]);
    const accountIdWallet = await queryInterface.bulkInsert('Accounts', [carteira]);

    transactionOnInter.accountId = accountIdInter;
    transactionOnWallet.accountId = accountIdWallet;

    const transactionIdOne = await queryInterface.bulkInsert('Transactions', [transactionOnInter]);
    const transactionIdTwo = await queryInterface.bulkInsert('Transactions', [transactionOnWallet]);

    transferOne.accountFromId = transactionIdOne;
    transferOne.accountToId = transactionIdTwo;
    transferTwo.accountFromId = transactionIdTwo;
    transferTwo.accountToId = transactionIdOne;

    await queryInterface.bulkInsert('Transfers', [
      transferOne,
      transferTwo,
    ]);
  },
  down: (queryInterface) => {
    queryInterface.bulkDelete('Users');
  }, /* queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => (
      queryInterface.bulkDelete('Users', null, { truncate: true })
        .then(() => (
          queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
        ))
    )), */
};
