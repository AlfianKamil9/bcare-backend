'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('konselors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_konselor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "name konselor can't be empty",
        },
      },
      email_konselor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "email konselor can't be empty",
        },
      },
      profile_konselor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "profile konselor can't be empty",
        },
      },
      deskripsi_konselor: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          message: "deskrips konselor can't be empty",
        },
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
    await queryInterface.dropTable('konselors');
  },
};
