const { Video, category_content, babyblues_category } = require('../models');

const getAllVideo = async (req, res) => {
  try {
    const getAllVideo = await Video.findAll({
      include: [
        {
          model: category_content,
          as: 'category_content',
        },
        {
          model: babyblues_category,
          as: 'babyblues_category',
        },
      ],
    });
    return res.status(200).json({
      code: 200,
      message: 'Successfully fetched videos',
      data: getAllVideo,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
    });
  }
};

const getDetailVideo = async (req, res) => {
  try {
    const getDetailVideo = await Video.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json({
      code: 200,
      message: 'Successfully Fetch detail videos',
      data: getDetailVideo,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
    });
  }
};

module.exports = {
  getAllVideo,
  getDetailVideo,
};
