'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'category_contents',
      [
        {
          category_name: 'Keluarga',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Kesehatan Mental',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category_contents', null, {});
  },
};
