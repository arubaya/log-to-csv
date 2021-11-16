const { DataTypes } = require('sequelize');
const model = require('../../models/errorlog');
const db = require('../database/connection');

const index = async () => {
  try {
    let logData = await model(db, DataTypes).findAll().then(data => data);
    console.log(JSON.stringify(logData, null,1));
  } catch (error) {
    console.log(error);
  }
}

const storeData = async (data, index, indexFile) => {
  try {
    let logData = await model(db, DataTypes).create(data, {
      logging: false,
    });
    console.log(`File ${indexFile}: ${index} record inserted`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { index, storeData };