'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      // define association here
      Video.belongsTo(models.category_content);
      Video.belongsTo(models.babyblues_category);
    }
  }
  Video.init(
    {
      categoryContentId: DataTypes.INTEGER,
      babyBluesCategoryId: DataTypes.INTEGER,
      title_video: DataTypes.STRING,
      link_video: DataTypes.STRING,
      deskripsi_video: DataTypes.TEXT,
      thumbnail_video: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Video',
    }
  );
  return Video;
};
