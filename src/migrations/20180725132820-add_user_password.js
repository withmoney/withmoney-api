module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn(
      'Users', 'password',
      {
        type: Sequelize.STRING,
        allowNull: false,
        after: 'email',
      },
    )
  ),
  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'password');
  },
};
