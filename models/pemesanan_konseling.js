'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan_konseling extends Model {
    static associate(models) {
      pemesanan_konseling.belongsTo(models.User);
      pemesanan_konseling.belongsTo(models.Konseling);
    }
  }
  pemesanan_konseling.init(
    {
      userId: DataTypes.INTEGER,
      konselingId: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      reference_code: DataTypes.STRING,
      status: DataTypes.ENUM(['CANCELED', 'PENDING', 'SUCCESS', 'REVIEWING']),
      transfer_proof: DataTypes.STRING,
      link_zoom: DataTypes.STRING,
      dateline_transfer: DataTypes.DATE,
      konseling_date: DataTypes.DATEONLY,
      konseling_time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: 'pemesanan_konseling',
    }
  );
  return pemesanan_konseling;
};
