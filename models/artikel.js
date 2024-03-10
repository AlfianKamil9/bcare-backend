'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artikel extends Model {
    static associate(models) {
      Artikel.belongsTo(models.category_content);
      Artikel.belongsTo(models.babyblues_category);
    }
  }
  Artikel.init(
    {
      categoryContentId: DataTypes.INTEGER,
      babyBluesCategoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      subTitle: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Artikel',
    }
  );
  return Artikel;
};
