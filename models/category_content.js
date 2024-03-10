'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category_content.hasMany(models.Artikel);
      category_content.hasMany(models.Video);
    }
  }
  category_content.init(
    {
      category_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'category_content',
    }
  );
  return category_content;
};
