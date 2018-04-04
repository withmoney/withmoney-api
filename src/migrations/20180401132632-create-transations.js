'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      type: {
        type: Sequelize.ENUM('in', 'out'),
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      transationDate: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => (
      queryInterface.addConstraint('Transactions', ['accountId'], {
        type: 'foreign key',
        name: 'fk_accounts_transation',
        references: { //Required field
          table: 'Accounts',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'no action'
      })
    ))
  ),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};