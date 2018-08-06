module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('in', 'out'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('Categories', ['UserId'], {
      type: 'foreign key',
      name: 'fk_user_categories',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
    await queryInterface.addColumn('Transactions', 'CategoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'AccountId',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'CategoryId');
    await queryInterface.dropTable('Categories');
  },
};
