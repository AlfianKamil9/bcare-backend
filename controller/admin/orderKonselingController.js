//onst { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const { pemesanan_konseling, Konseling, konselor, User } = require('../../models');
const { bucket } = require('../../module/storageSetUp');
const { cariImageLama } = require('../../module/storageSetUp');
const moment = require('moment');

// list order
const getAllOrder = async (req, res) => {
  try {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    await pemesanan_konseling.update(
      {
        status: 'CANCELED',
      },
      {
        where: {
          status: 'PENDING',
          dateline_transfer: {
            [Op.lte]: now,
          },
        },
      }
    );
    const allOrder = await pemesanan_konseling.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: Konseling,
          as: 'Konseling',
          include: [
            {
              model: konselor,
              as: 'konselor',
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
      message: 'Successfully Get All Orders from Users',
      data: allOrder,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,' + error,
    });
  }
};

//list order with status
const getAllOrderFromStatus = async (req, res) => {
  const status = req.params.status;
  try {
    const allOrderFromStatus = await pemesanan_konseling.findAll({
      where: { status: status.toUpperCase() },
      order: [['id', 'DESC']],
    });
    return res.status(200).json({
      code: 200,
      message: 'Successfully Get All Orders from Status Order ',
      data: allOrderFromStatus,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,' + error,
    });
  }
};

// accepting payment after upload image
const acceptingPayment = async (req, res) => {
  const { link_zoom } = req.body;
  const checkRef = await pemesanan_konseling.findOne({
    where: { reference_code: req.params.reference_code },
  });
  if (!checkRef) {
    return res.status(404).json({
      code: 404,
      message: 'Orders Not Found',
    });
  }
  if (checkRef.transfer_proof == null) {
    return res.status(400).json({
      code: 400,
      message: "Failed, User doesn't upload proof",
    });
  }
  if (checkRef.status !== 'REVIEWING') {
    return res.status(400).json({
      code: 400,
      message: 'Forbidden',
    });
  }

  try {
    const acceptPayment = await pemesanan_konseling.update(
      {
        status: 'SUCCESS',
        link_zoom: link_zoom,
      },
      {
        where: {
          reference_code: req.params.reference_code,
        },
      }
    );
    if (acceptPayment) {
      return res.status(200).json({
        code: 200,
        message: 'Payment successfully approved',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Payment failed to approve',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,' + error,
    });
  }
};

// rejecting image proof not suitable
const rejectingPayment = async (req, res) => {
  //check reference_code
  const checkRef = await pemesanan_konseling.findOne({
    where: { reference_code: req.params.reference_code },
  });
  if (!checkRef) {
    return res.status(404).json({
      code: 404,
      message: 'Orders Not Found',
    });
  }

  if (checkRef.status !== 'REVIEWING') {
    return res.status(400).json({
      code: 403,
      message: 'Forbidden',
    });
  }
  //return res.json(checkRef);
  // ambil data image lama
  const imageUrlLama = checkRef.transfer_proof;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);
  try {
    const rejectPayment = await pemesanan_konseling.update(
      {
        status: 'PENDING',
        transfer_proof: null,
      },
      {
        where: {
          reference_code: req.params.reference_code,
        },
      }
    );
    const deleteImage = await bucket.file(fileNameYgdiganti).delete();
    if (rejectPayment && deleteImage) {
      return res.status(200).json({
        code: 200,
        message: 'Payment successfully rejected',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Payment failed to reject',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error,' + error,
    });
  }
};

module.exports = {
  getAllOrder,
  getAllOrderFromStatus,
  acceptingPayment,
  rejectingPayment,
};
