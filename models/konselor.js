'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class konselor extends Model {
    static associate(models) {
      konselor.hasMany(models.Konseling);
    }
  }
  konselor.init(
    {
      name_konselor: DataTypes.STRING,
      email_konselor: DataTypes.STRING,
      profile_konselor: DataTypes.STRING,
      deskripsi_konselor: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'konselor',
    }
  );
  return konselor;
};
