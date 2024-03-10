'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class babyblues_category extends Model {
    static associate(models) {
      babyblues_category.hasMany(models.Konseling);
      babyblues_category.hasMany(models.Artikel);
      babyblues_category.hasMany(models.Video);
      // babyblues_category.hasMany(models.Answer);
    }
  }
  babyblues_category.init(
    {
      status_category: DataTypes.STRING,
      babyblues_description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'babyblues_category',
    }
  );
  return babyblues_category;
};
