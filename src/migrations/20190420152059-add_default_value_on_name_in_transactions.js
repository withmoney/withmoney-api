module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Transactions', 'name', {
      type: Sequelize.STRING,
      defaultValue: '',
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Transactions', 'name', {
      type: Sequelize.STRING,
      defaultValue: false,
    }),
};
