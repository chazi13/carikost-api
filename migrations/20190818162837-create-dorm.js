'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dorms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('Campur', 'Putra', 'Putri')
      },
      rooms_avaibel: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      full_address: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.DECIMAL(1,1)
      },
      lenght: {
        type: Sequelize.DECIMAL(1,1)
      },
      features: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dorms');
  }
};