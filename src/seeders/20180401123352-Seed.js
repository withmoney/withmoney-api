const bcrypt = require('bcrypt');
const config = require('../../config/envs');

const timestamp = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user = {
  name: 'David Costa',
  email: 'davidcostadev@gmail.com',
  password: bcrypt.hashSync('P@ssw0rd', bcrypt.genSaltSync(config.BCRYPT_SALT)),
  enabled: true,
  ...timestamp,
};

const bancointer = {
  name: 'Banco Inter',
  type: 'checking_account',
  initalValue: 505.18,
  ...timestamp,
};

const carteira = {
  name: 'Carteira',
  type: 'wallet',
  initalValue: 650,
  ...timestamp,
};

const transactionOnInter = {
  name: 'Lanche na Sonia',
  value: 30.90,
  type: 'out',
  isPaid: true,
  transationDate: new Date(),
  ...timestamp,
};

const transactionOnWallet = {
  name: 'Coxinha',
  value: 3.13,
  type: 'out',
  isPaid: false,
  transationDate: new Date(),
  ...timestamp,
};

const transferOne = {
  value: 10,
  transferDate: new Date(),
  ...timestamp,
};
const transferTwo = {
  value: 10,
  transferDate: new Date(),
  ...timestamp,
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
