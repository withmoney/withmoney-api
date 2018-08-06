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

const salarioCategory = {
  name: 'Salário',
  type: 'in',
  ...timestamp,
};
const lancheCategory = {
  name: 'Lanche',
  type: 'out',
  ...timestamp,
};

const bancointerAccount = {
  name: 'Banco Inter',
  type: 'checking_account',
  initalValue: 505.18,
  ...timestamp,
};

const carteiraAccount = {
  name: 'Carteira',
  type: 'wallet',
  initalValue: 650,
  ...timestamp,
};

const interTransactionOne = {
  name: 'Salario do Mês',
  value: 937,
  type: 'in',
  isPaid: true,
  transactionDate: new Date(),
  ...timestamp,
};
const interTransactionTwo = {
  name: 'Lanche na Sonia',
  value: 30.90,
  type: 'out',
  isPaid: true,
  transactionDate: new Date(),
  ...timestamp,
};

const walletTransaction = {
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

    lancheCategory.UserId = userId;
    salarioCategory.UserId = userId;

    const lancheCategoryId = await queryInterface.bulkInsert('Categories', [lancheCategory]);
    const salarioCategoryId = await queryInterface.bulkInsert('Categories', [salarioCategory]);

    bancointerAccount.UserId = userId;
    carteiraAccount.UserId = userId;

    const accountIdInter = await queryInterface.bulkInsert('Accounts', [bancointerAccount]);
    const accountIdWallet = await queryInterface.bulkInsert('Accounts', [carteiraAccount]);

    interTransactionOne.UserId = userId;
    interTransactionTwo.UserId = userId;
    walletTransaction.UserId = userId;
    interTransactionOne.CategoryId = salarioCategoryId;
    interTransactionTwo.CategoryId = lancheCategoryId;
    walletTransaction.CategoryId = lancheCategoryId;
    interTransactionOne.AccountId = accountIdInter;
    interTransactionTwo.AccountId = accountIdInter;
    walletTransaction.AccountId = accountIdWallet;

    await queryInterface.bulkInsert('Transactions', [interTransactionOne]);
    await queryInterface.bulkInsert('Transactions', [interTransactionTwo]);
    await queryInterface.bulkInsert('Transactions', [walletTransaction]);

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
