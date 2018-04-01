'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Accounts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          // name: 'fk_users_account',
          // references: {
          //   model: 'Users',
          //   key: 'id',
          // },
          // onDelete: 'CASCADE',
          // onUpdate: 'NO ACTION'
        },
        name: {
          type: Sequelize.STRING
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
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addConstraint('Accounts', ['userId'], {
          type: 'foreign key',
          name: 'fk_users_account',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'no action'
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accounts');
  }
};