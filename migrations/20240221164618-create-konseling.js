'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Konselings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title_konseling: {
        type: Sequelize.STRING,
      },
      image_konseling: {
        type: Sequelize.TEXT,
      },
      deskripsi_konseling: {
        type: Sequelize.STRING,
      },
      harga_konseling: {
        type: Sequelize.INTEGER,
      },
      konselorId: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true,
          message: "Konselor can't be empty",
        },
        allowNull: false,
        references: {
          model: 'konselors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      babyBluesCategoryId: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true,
          message: " Baby Blues Category can't be empty",
        },
        allowNull: false,
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
    await queryInterface.dropTable('Konselings');
  },
};
