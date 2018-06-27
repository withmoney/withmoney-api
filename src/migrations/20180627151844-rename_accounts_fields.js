module.exports = {
  up: (queryInterface) => {
    queryInterface.renameColumn('Accounts', 'userId', 'UserId');
  },

  down: (queryInterface) => {
    queryInterface.renameColumn('Accounts', 'UserId', 'userId');
  },
};
