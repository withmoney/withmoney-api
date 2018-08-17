module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Transactions', 'JournalId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      after: 'CategoryId',
    });

    await queryInterface.addConstraint('Transactions', ['JournalId'], {
      name: 'fk_journals_transactions',
      type: 'foreign key',
      references: {
        table: 'Journals',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'no action',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'JournalId');
  },
};
