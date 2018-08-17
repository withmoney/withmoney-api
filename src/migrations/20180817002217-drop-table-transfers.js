module.exports = {
  up: async (queryInterface) => {
    queryInterface.dropTable('Transfers');
  },
  down: () => {},
};
