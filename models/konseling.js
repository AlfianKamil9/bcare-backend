'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Konseling extends Model {
    static associate(models) {
      Konseling.belongsTo(models.konselor);
      Konseling.belongsTo(models.babyblues_category);
      Konseling.hasMany(models.pemesanan_konseling);
    }
  }
  Konseling.init(
    {
      konselorId: DataTypes.INTEGER,
      babyBluesCategoryId: DataTypes.INTEGER,
      title_konseling: DataTypes.STRING,
      image_konseling: DataTypes.TEXT,
      deskripsi_konseling: DataTypes.STRING,
      harga_konseling: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Konseling',
    }
  );
  return Konseling;
};
