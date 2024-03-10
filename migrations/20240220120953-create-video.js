'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title_video: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "Title Video can't be empty",
        },
      },
      link_video: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "Link Video can't be empty",
        },
      },
      deskripsi_video: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "Deskripsi Video can't be empty",
        },
      },
      thumbnail_video: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "Thumbnail Video can't be empty",
        },
      },
      categoryContentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "Category Content can't be empty",
        },
        references: {
          model: 'category_contents',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      babyBluesCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "Category Baby Blues can't be empty",
        },
        references: {
          model: 'babyblues_categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Videos');
  },
};
