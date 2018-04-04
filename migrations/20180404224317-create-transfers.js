'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      accountIdFrom: {
        type: Sequelize.INTEGER,
      },
      accountIdTo: {
        type: Sequelize.INTEGER,
      },
      transferDate: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => (
      queryInterface.addConstraint('Transfers', ['accountIdFrom'], {
        type: 'foreign key',
        name: 'fk_transfers_account_from',
        references: { //Required field
          table: 'Accounts',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'no action'
      })
    ))
    .then(() => (
      queryInterface.addConstraint('Transfers', ['accountIdTo'], {
        type: 'foreign key',
        name: 'fk_transfers_account_to',
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
    return queryInterface.dropTable('Transfers');
  }
};