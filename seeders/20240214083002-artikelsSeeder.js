'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Artikels',
      [
        {
          title: 'Mengenal Baby Blues Syndrome: Penyebab, Gejala, dan Cara Mengatasi',
          categoryContentId: 2,
          babyBluesCategoryId: 2,
          image: 'https://storage.googleapis.com/models-mechine-learning-ch2-ps134/image_artikel/mengenal-baby-blues.jpg',
          subTitle: 'Mengenal Baby Blues Syndrome',
          content: `
          Cara Mengatasi Baby Blues Syndrome
          
          Munculnya sindrom baby blues memang umum terjadi pada ibu usai melahirkan. Namun ini bisa memberikan dampak negatif tidak hanya bagi ibu, tapi juga bayi yang baru lahir. Bagaimana cara mengatasi ibu yang mengalami baby blues?
          1. Pola makan sehat 
          Mengonsumsi makanan dalam interval teratur dan mencukupi kebutuhan energi tubuh dapat membantu menjaga kadar gula darah tetap stabil. Kelaparan dan hipoglikemia (kadar gula darah rendah) dapat memengaruhi suasana hati dan menyebabkan perubahan emosi yang drastis. 
          2. Istirahat cukup
          Menurut studi berjudul The Baby Blues and Postnatal Depression yang dalam Andalas Journal of Public Health, istirahat yang cukup dan membiarkan ibu mengeluarkan isi hatinya, dapat mencegah syndrome baby blues yang berkepanjangan.
          3. Mencari banyak informasi seputar persalinan 
          Ini penting agar ibu tidak merasa “kaget” saat mulai merawat Si Kecil. Bicarakan dengan dokter mengenai cara merawat Si Kecil sekaligus menjaga kesehatannya. Ketika ibu tahu cara dan siap merawat Si Kecil, maka syndrome baby blues  pun dapat ibu hindari.
          4. Berbagi beban bersama pasangan atau keluarga
          Ini merupakan cara terbaik untuk menghindari sindrom pasca melahirkan. Bicarakan masalah merawat Si Kecil serta berbagi tanggung jawab dengan pasangan dapat meringankan beban ibu, baik secara fisik maupun psikis.
          5. Bergabung dengan komunitas 
          Menurut jurnal ilmiah berjudul How to Cope with Baby Blues: A Case Report di Journal of Psychiatry Psychology and Behavioral Research, dukungan support system pada ibu saat hamil dan setelah melahirkan akan mencegah terjadinya baby blues syndrome. Berbagi pengalaman dengan ibu-ibu lain melalui komunitas online ataupun dengan sahabat yang juga seorang ibu, dapat memberikan rasa lega dan mengurangi beban emosional yang ibu rasakan.
          6. Lakukan ‘me time’
          Ketika pikiran dan perasaan sudah mumet, luangkanlah waktu untuk diri sendiri. Mintalah seseorang untuk menjaga bayi supaya kamu bisa keluar rumah. Entah itu mendapatkan sinar matahari, jalan sore, atau pergi ke mall, sekadar untuk ‘me time’ dan menenangkan diri. Menurut jurnal ilmiah berjudul Fenomena Postpartum Blues pada Primipara (Ibu dengan Kelahiran Bayi Pertama), dalam Jurnal Kesehatan Mahardika, menitipkan anak sementara waktu dan melakukan aktivitas yang disenangi dapat mengatasi baby blues syndrome.
          7. Berpikir positif 
          Berpikir positif dapat membantu meningkatkan kesejahteraan emosional ibu. Fokus pada pikiran-pikiran positif dan memahami bahwa gejala syndrome baby blues adalah hal yang wajar dan akan berlalu, dapat membantu ibu menghadapi fase ini dengan lebih baik.
          8. Rutin berolahraga
          Olahraga dapat menjadi salah satu cara ibu mengatasi baby blues syndrome. Dengan rutin beraktivitas fisik emosi ibu bisa terkuras di sana, pun ibu bisa mengalihkan perasaan sedih dan cemas dengan mengolah fisik. Olahraga juga bisa membuat mood menjadi lebih positif.
          9. Konsultasi dengan dokter
          Jika memang sudah tidak bisa ditangani lagi, berkonsultasi dengan dokter adalah pilihan tepat untuk mengatasi baby blues syndrome. Dokter dapat merekomendasikan terapi ataupun pengobatan medis yang tepat, sehingga ibu bisa menjadi lebih sehat dan berpikir positif.
          
          `,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Artikels', null, {});
  },
};
