'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          question: 'Saya tidak mampu tertawa dan melihat sisis lucu dari hal-hal sekitar saya',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya tidak bisa melihat hal yang baik untuk masa yang akan datang',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya selalu menyalahkan diri saya untuk hal-hal kecil',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya terlalu cemas dan khawatir tanpa alasan',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya merasa takut atau panik tanpa alasan yang sangat baik',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya merasa keadaan sekitar saya sudah mulai tak bisa saya atasi',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya sangat tidak bahagia sampai sya memiliki kesulitan tidur',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya merasa sedih atau sengsara',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Saya tidak bahagia sampai-sampai saya menangis',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Pikiran untuk melukai diri sempat terlintas dii pikiran saya',
          opsi_1: 'Ya, Sering',
          opsi_2: 'Ya, Sebagian waktu',
          opsi_3: 'Tidak terlalu sering',
          opsi_4: 'Tidak sama sekali',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
