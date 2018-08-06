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
  transactionDate: new Date(),
  ...timestamp,
};

const transactionOnWallet = {
  name: 'Coxinha',
  value: 3.13,
  type: 'out',
  isPaid: false,
  transactionDate: new Date(),
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
    bancointer.UserId = userId;
    carteira.UserId = userId;

    const accountIdInter = await queryInterface.bulkInsert('Accounts', [bancointer]);
    const accountIdWallet = await queryInterface.bulkInsert('Accounts', [carteira]);

    transactionOnInter.UserId = userId;
    transactionOnWallet.UserId = userId;
    transactionOnInter.AccountId = accountIdInter;
    transactionOnWallet.AccountId = accountIdWallet;

    await queryInterface.bulkInsert('Transactions', [transactionOnInter]);
    await queryInterface.bulkInsert('Transactions', [transactionOnWallet]);

    transferOne.UserId = userId;
    transferTwo.UserId = userId;
    transferOne.AccountFromId = accountIdInter;
    transferOne.AccountToId = accountIdWallet;
    transferTwo.AccountFromId = accountIdWallet;
    transferTwo.AccountToId = accountIdInter;

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
