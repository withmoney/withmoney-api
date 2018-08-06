module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UserIdDefinitions = {
      type: Sequelize.INTEGER,
      after: 'id',
    };
    const UserForeingKey = {
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'no action',
    };

    await queryInterface.addColumn('Transactions', 'UserId', UserIdDefinitions);
    await queryInterface.addColumn('Transfers', 'UserId', UserIdDefinitions);

    queryInterface.addConstraint('Transactions', ['UserId'], {
      ...UserForeingKey,
      name: 'fk_users_transactions',
    });

    queryInterface.addConstraint('Transfers', ['UserId'], {
      ...UserForeingKey,
      name: 'fk_users_transfers',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'UserId');
    await queryInterface.removeColumn('Transfers', 'UserId');
  },
};
