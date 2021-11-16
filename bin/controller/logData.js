const { DataTypes } = require('sequelize');
const model = require('../../models/logdata');
const db = require('../database/connection');

const index = async () => {
  try {
    let logData = await model(db, DataTypes).findAll().then(data => data);
    console.log(JSON.stringify(logData, null,2));
  } catch (error) {
    console.log(error);
  }
}

const storeData = async (data, index) => {
  try {
    let logData = await model(db, DataTypes).create(data);
    console.log(`${index} record inserted`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { index, storeData };