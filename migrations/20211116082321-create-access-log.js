'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccessLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.TEXT
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      waktu: {
        type: Sequelize.TEXT
      },
      method: {
        type: Sequelize.TEXT
      },
      aux_method: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      browser: {
        type: Sequelize.TEXT
      },
      os: {
        type: Sequelize.TEXT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AccessLogs');
  }
};