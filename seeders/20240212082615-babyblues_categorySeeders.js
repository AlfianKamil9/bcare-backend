'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'babyblues_categories',
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          status_category: 'Aman',
          babyblues_description:
            'Jaga kesehatan mental anda dengan olahraga teratur dan pola tidur yang cukup. Pertahankan hubungan sosial yang positif dan hindari isolasi diri Terapkan teknik manajemen stres seperti meditasi atau pernapasan dalam.',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          status_category: 'Kemungkinan Depresi',
          babyblues_description:
            'Cari dukungan dari teman, keluarga, atau seorang profesional kesehatan mental Terlibat dalam kegiatan yang memberikan kebahagiaan dan meningkatkan mood pertimbangkan untuk menjalani terapi kognitif perilaku (CBT)',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          status_category: 'Depresi Ringan',
          babyblues_description:
            'Segera konsultasikan dengan seorang profesional kesehatan mental untuk evaluasi dan bimbingan. Pertimbangkan terapi psikoterapi dan, jika diperlukan, pengobatan farmakologis. Perhatikan pola makan, aktivitas fisik, dan tidur yang sehat.',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          status_category: 'Depresi Berat',
          babyblues_description:
            'Konsultasikan segera dan dapatkan bantuan segera dari profesional kesehatan mental atau lembaga kesehatan dan pertimbangkan rawat inap jika diperlukan untuk pengawasan intensif, anda perlu mendapat dukungan keluarga dalam proses penyembuhan anda.',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('babyblues_categories', null, {});
  },
};
