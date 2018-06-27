module.exports = {
  up: (queryInterface) => {
    queryInterface.renameColumn('Transactions', 'accountId', 'AccountId');
  },

  down: (queryInterface) => {
    queryInterface.renameColumn('Transactions', 'AccountId', 'accountId');
  },
};
