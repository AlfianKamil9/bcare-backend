const { category_content } = require('../models');

const getAllCategoryContent = async (req, res) => {
  try {
    const getAllCategoryContent = await category_content.findAll();
    if (getAllCategoryContent) {
      return res.status(200).json({
        code: 200,
        message: 'Successfully get all Category Content.',
        data: getAllCategoryContent,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'No Category Content found.',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error.' + error,
    });
  }
};

const getDetailCategoryContent = async (req, res) => {
  try {
    const getDetailCategoryContent = await category_content.findOne({
      where: { id: req.params.id },
    });
    if (getDetailCategoryContent) {
      return res.status(200).json({
        code: 200,
        message: 'Successfully get Category Content Detail.',
        data: getDetailCategoryContent,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'No Category Content found.',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error.' + error,
    });
  }
};

module.exports = {
  getAllCategoryContent,
  getDetailCategoryContent,
};
