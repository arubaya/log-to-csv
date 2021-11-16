const { Sequelize } = require('sequelize');

const db = new Sequelize('learning_server', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = db;

