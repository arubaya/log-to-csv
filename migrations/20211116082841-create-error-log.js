'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ErrorLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      error_type: {
        type: Sequelize.TEXT
      },
      pid_title: {
        type: Sequelize.TEXT
      },
      pid: {
        type: Sequelize.TEXT
      },
      ip_title: {
        type: Sequelize.TEXT
      },
      ip_client: {
        type: Sequelize.TEXT
      },
      message: {
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
    await queryInterface.dropTable('ErrorLogs');
  }
};