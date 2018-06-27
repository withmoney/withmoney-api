module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('Transfers', 'accountFromId', 'AccountFromId');
    await queryInterface.renameColumn('Transfers', 'accountToId', 'AccountToId');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('Transfers', 'AccountFromId', 'accountFromId');
    await queryInterface.renameColumn('Transfers', 'AccountToId', 'accountToId');
  },
};
