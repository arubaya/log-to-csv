'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LogData.init(
    {
      ip: DataTypes.TEXT,
      tanggal: DataTypes.DATEONLY,
      waktu: DataTypes.TEXT,
      method: DataTypes.TEXT,
      aux_method: DataTypes.TEXT,
      status: DataTypes.TEXT,
      url: DataTypes.TEXT,
      browser: DataTypes.TEXT,
      os: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'LogData',
    }
  );
  return LogData;
};
