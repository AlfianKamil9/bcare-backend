'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemesanan_konselings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      konselingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Konselings',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reference_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(['CANCELED', 'PENDING', 'SUCCESS', 'REVIEWING']),
        allowNull: false,
      },
      transfer_proof: {
        type: Sequelize.STRING,
      },
      link_zoom: {
        type: Sequelize.STRING,
      },
      dateline_transfer: {
        type: Sequelize.DATE,
      },
      konseling_date: {
        type: Sequelize.DATEONLY,
      },
      konseling_time: {
        type: Sequelize.TIME,
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
    await queryInterface.dropTable('pemesanan_konselings');
  },
};
