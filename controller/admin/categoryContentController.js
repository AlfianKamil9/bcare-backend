const { category_content } = require('../../models');

const createCategoryContent = async (req, res) => {
  try {
    const { category_name } = req.body;
    const createCategoryContent = await category_content.create({
      category_name,
    });
    if (createCategoryContent) {
      return res.status(201).json({
        code: 201,
        message: 'Category Content Successfully Created',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Create Category Content',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error' + error,
    });
  }
};

const updateCategoryContent = async (req, res) => {
  try {
    const { category_name } = req.body;
    const updateCategoryContent = await category_content.update(
      {
        category_name,
      },
      { where: { id: req.params.id } }
    );
    if (updateCategoryContent) {
      return res.status(200).json({
        code: 200,
        message: 'Category Content Updated Successfully',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Category Content Not Found',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error' + error,
    });
  }
};

const deleteCategoryContent = async (req, res) => {
  try {
    const deletedCategoryContent = await category_content.destroy({
      where: { id: req.params.id },
    });
    if (deletedCategoryContent) {
      return res.status(200).json({
        code: 200,
        message: 'Delete Category Content Successfully',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to delete Category Content',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error' + error,
    });
  }
};

module.exports = {
  createCategoryContent,
  updateCategoryContent,
  deleteCategoryContent,
};
