module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn(
      'Users', 'password',
      {
        type: Sequelize.STRING,
        after: 'email',
      },
    )
  ),
  down: queryInterface => (
    queryInterface.removeColumn('Users', 'password')
  ),
};
