'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          email: 'admin@gmail.com',
          familyEmail: 'admin@gmail.com',
          roles: 'admin',
          password: '$2a$12$oBuIrXhwbRBmsDEV./YKHe1zjQFlJ9r/ClDmJ/0u4ekq4C6HoRX3e',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Dewi Aulia Sari',
          email: 'rifqialfiansyahk@gmail.com',
          familyEmail: 'admin@gmail.com',
          roles: 'user',
          password: '$2b$10$zxhOGmy9c.utEkz2GjNWyujlDXtNO7mAexqc6nG76RKDq/AZqrHiG',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
