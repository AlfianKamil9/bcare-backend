const { nanoid } = require('nanoid');
const { pemesanan_konseling, Konseling, konselor, User } = require('../models');
const moment = require('moment');
const nodeMailer = require('nodemailer');
let imageUrl;

const historyOrder = async (req, res) => {
  try {
    const history = await pemesanan_konseling.findAll({
      where: {
        userId: req.userData.id,
      },
      order: [['id', 'DESC']],
      include: [
        {
          model: Konseling,
          as: 'Konseling',
          include: [
            {
              model: konselor,
              as: 'konselor',
              attributes: ['name_konselor', 'profile_konselor'],
            },
          ],
        },
        {
          model: User,
          as: 'User',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.status(200).json({
      code: 200,
      message: 'Get Order By User',
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,  ' + error,
    });
  }
};

const detailHistoryOrder = async (req, res) => {
  console.log(req.params.reference_code);
  try {
    const detailHistory = await pemesanan_konseling.findOne({
      where: {
        reference_code: req.params.reference_code,
      },
      include: [
        {
          model: Konseling,
          as: 'Konseling',
          include: [
            {
              model: konselor,
              as: 'konselor',
              attributes: ['name_konselor', 'profile_konselor'],
            },
          ],
        },
      ],
    });
    if (detailHistory) {
      return res.status(200).json({
        code: 200,
        message: 'Get Detail Order By User',
        data: detailHistory,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'Detail History Not Found',
      data: detailHistory,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,  ' + error,
    });
  }
};

const createOrderKonseling = async (req, res) => {
  const { konselingId, konseling_date, konseling_time } = req.body;
  //console.log(req.body);
  const userId = req.userData.id;
  const dateNow = moment().locale('id');
  // create reference
  const reference_code = 'DEV-' + konselingId + userId + dateNow.format('YYYYMMDDHHmm') + nanoid(5).toUpperCase();
  // ambil data konseling
  const konseling = await Konseling.findOne({
    where: { id: konselingId },
    include: [
      {
        model: konselor,
        as: 'konselor',
        attributes: ['name_konselor'],
      },
    ],
  });

  // create total price
  const total_price = konseling.harga_konseling + 0;
  // set Status pemesanan pertama
  const status = 'PENDING';
  // set waktu dateline transfer
  const setTomorrow = dateNow.add(1, 'day');
  const dateline_transfer = setTomorrow.format('YYYY-MM-DD HH:mm:ss');
  //set data to email
  const dataToEmail = {
    name_order: req.userData.name,
    email_order: req.userData.email,
    reference_code: reference_code,
    dateline_transfer: dateline_transfer,
    total_price: total_price,
    name_konselor: konseling.konselor.name_konselor,
    konseling_date: konseling_date,
    konseling_time: konseling_time,
  };
  // memasukkan data ke db
  try {
    const createOrder = await pemesanan_konseling.create({
      userId,
      konselingId,
      reference_code,
      status,
      total_price,
      transfer_proof: null,
      konseling_date,
      konseling_time,
      dateline_transfer,
    });
    if (createOrder) {
      await emailConfirmPayment(dataToEmail);
      return res.status(201).json({
        code: 201,
        message: 'Your order successfully created, Please check your email to complete your payment',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed, Your Order is failed to process',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,  ' + error,
    });
  }
};

// sementara
const uploadProofTransfer = async (req, res) => {
  // check ref
  const checkRef = await pemesanan_konseling.findOne({
    where: { reference_code: req.params.reference_code },
  });
  if (!checkRef) {
    return res.status(404).json({
      code: 404,
      message: 'reference code is not found',
    });
  }
  if (checkRef.transfer_proof != null) {
    return res.status(400).json({
      code: 400,
      message: "you can't upload again ",
    });
  }
  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }

  try {
    // input image proof
    const uploadProof = await pemesanan_konseling.update(
      {
        transfer_proof: imageUrl,
        status: 'REVIEWING',
      },
      {
        where: { reference_code: req.params.reference_code },
      }
    );
    if (uploadProof) {
      return res.status(200).json({
        code: 200,
        message: 'success upload your proof, please waiting for review',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'failed to upload your proof',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,  ' + error,
    });
  }
};

const emailConfirmPayment = async (dataToEmail) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rifqialfiansyah10@gmail.com',
      pass: 'jviuacisibumgnfw',
    },
  });

  const dateline = moment(dataToEmail.dateline_transfer).format('dddd, DD MMMM YYYY HH:mm');

  transporter.sendMail({
    from: 'admin-payment@Bcare',
    to: dataToEmail.email_order,
    subject: 'Konfirmasi Pembayaran Konseling',
    text: `
        Kepada Yth. ${dataToEmail.name_order},

        Terima kasih telah memesan sesi konseling dengan ${dataToEmail.name_konselor}. Kami ingin mengonfirmasi bahwa sesi konseling Anda dijadwalkan pada:

        Tanggal: ${moment(dataToEmail.konseling_date).format('DD MMMM YYYY')}
        Waktu: ${moment(dataToEmail.konseling_time).format('HH:mm') + ' WIB'} 
        Durasi: 30 Menit
        Metode Konseling: Online

        Biaya Konseling:

        Jumlah: ${dataToEmail.total_price}
        Metode Pembayaran: Transfer Bank
        Mohon segera melakukan pembayaran untuk mengkonfirmasi sesi konseling Anda.

        Langkah Pembayaran:
  
        Pilih metode pembayaran yang Anda inginkan.
        Lakukan transfer ke rekening berikut:

        Nama Bank: BANK BRI
        Nomor Rekening: 8902658352626
        Kode Pemesanan: ${dataToEmail.reference_code}
        Atas Nama: Admin Payment BCARE
        Konfirmasi pembayaran Anda dengan membalas email ini dengan bukti transfer.

        Pembayaran harus dilakukan paling lambat ${dateline} untuk memastikan sesi konseling Anda terkonfirmasi.

        Jika Anda memiliki pertanyaan, silakan hubungi kami di 081358861870.

        Terima kasih atas perhatiannya.

        Hormat kami,

        BCARE - Baby Blues and Konseling Application
        `,
  });
  console.log('berhasil kirim email');
};

module.exports = {
  createOrderKonseling,
  historyOrder,
  detailHistoryOrder,
  uploadProofTransfer,
};
