const { Konseling, babyblues_category, konselor } = require('../models');

const getAllKonseling = async (req, res) => {
  try {
    const getAllKonseling = await Konseling.findAll({
      include: [
        {
          model: babyblues_category,
          as: 'babyblues_category',
          attributes: ['status_category'],
        },
        {
          model: konselor,
          as: 'konselor',
        },
      ],
    });
    return res.status(200).json({
      code: 200,
      message: 'Successfully get all Konseling.',
      data: getAllKonseling,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error.' + error,
    });
  }
};

const getDetailKonseling = async (req, res) => {
  try {
    const getDetailKonseling = await Konseling.findOne({
      include: [
        {
          model: babyblues_category,
          as: 'babyblues_category',
          attributes: ['status_category'],
        },
        {
          model: konselor,
          as: 'konselor',
        },
      ],
      where: { id: req.params.id },
    });
    if (getDetailKonseling) {
      return res.status(200).json({
        code: 200,
        message: 'Successfully get Detail Konseling.',
        data: getDetailKonseling,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'No Konseling found.',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error.' + error,
    });
  }
};

module.exports = {
  getAllKonseling,
  getDetailKonseling,
};
