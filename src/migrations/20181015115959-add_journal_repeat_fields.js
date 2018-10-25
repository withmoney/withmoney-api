module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Journals', 'repeatAmount', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      after: 'type',
    });
    await queryInterface.addColumn('Journals', 'repeatType', {
      type: Sequelize.ENUM('day', 'week', 'month', 'year'),
      allowNull: true,
      defaultValue: null,
      after: 'repeatAmount',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Journals', 'repeatAmount');
    await queryInterface.removeColumn('Journals', 'repeatType');
  },
};
