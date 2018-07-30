module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('Users', 'password',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    )
  ),
  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'password');
  },
};
