module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      after: 'name',
      unique: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      after: 'name',
      unique: false,
    });
  },
};
