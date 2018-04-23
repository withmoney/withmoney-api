module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM('wallet', 'investing', 'checking_account'),
      },
      initalValue: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
      .then(() => (
        queryInterface.addConstraint('Accounts', ['userId'], {
          type: 'foreign key',
          name: 'fk_users_account',
          references: { // Required field
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'no action',
        })
      ))
  ),
  down: queryInterface => queryInterface.dropTable('Accounts'),
};
