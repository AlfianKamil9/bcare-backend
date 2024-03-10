const { Artikel, category_content } = require('../models');

// GET ARTIKEL
const getAllArtikel = async (req, res) => {
  try {
    const data = await Artikel.findAll({
      include: [
        {
          model: category_content,
          as: 'category_content',
          attributes: ['category_name'],
        },
      ],
    });
    //console.log(data);
    return res.status(200).json({
      code: 200,
      message: 'Success Get Data Artikel',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error, ' + error,
    });
  }
};

// GET DETAIL ARTIKEL
const getDetailArtikel = async (req, res) => {
  try {
    const { id } = req.params;
    const dataId = await Artikel.findOne({
      where: { id: id },
      include: [
        {
          model: category_content,
          as: 'category_content',
          attributes: ['category_name'],
        },
      ],
    });
    if (dataId) {
      return res.status(200).json({
        code: 200,
        message: 'Detail Artikel',
        data: dataId,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'Not Found',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error, ' + error,
    });
  }
};

module.exports = {
  getAllArtikel,
  getDetailArtikel,
};
