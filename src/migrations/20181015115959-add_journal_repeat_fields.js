const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await replaceEnum({
      queryInterface,
      tableName: 'Journals',
      columnName: 'type',
      defaultValue: 'transfers',
      newValues: ['transfers', 'repeat'],
      enumName: 'enum_Journals_type',
    });
    // await queryInterface.sequelize.query(`
    //   DROP TYPE "enum_Journals_type";
    // `);
    // ALTER TABLE "Journals" DROP COLUMN \"sellerAccountType\";
    // await queryInterface.changeColumn('Journals', 'type', {
    //   type: Sequelize.ENUM,
    //   values: ['transfers', 'repeat'],
    // });
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Journals', 'type', {
      type: Sequelize.ENUM('transfers'),
    });
    await queryInterface.removeColumn('Journals', 'repeatAmount');
    await queryInterface.removeColumn('Journals', 'repeatType');
  },
};
