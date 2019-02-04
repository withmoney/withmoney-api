module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      after: 'name',
    })
  ),
  down: queryInterface => (
    queryInterface.removeColumn('Users', 'email')
  ),
};
