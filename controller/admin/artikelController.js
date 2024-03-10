const { Artikel } = require('../../models');
const { bucket } = require('../../module/storageSetUp');
const { cariImageLama } = require('../../module/storageSetUp');
let imageUrl;

// Create Artikel
const createArticle = async (req, res) => {
  const { title, categoryContentId, babyBluesCategoryId, subTitle, content } = req.body;

  try {
    // input image
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    }

    const body = {
      title,
      categoryContentId,
      image: imageUrl,
      babyBluesCategoryId,
      subTitle,
      content,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const createArtikel = await Artikel.create(body);
    if (createArtikel) {
      return res.status(201).json({
        code: 201,
        message: 'Article Successfully Created',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Create Article',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error' + error,
    });
  }
};

// Update Article
const updateArticle = async (req, res) => {
  const { title, categoryContentId, babyBluesCategoryId, subTitle, content } = req.body;

  //check ID
  const checkId = await Artikel.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }

  // ambil data image lama
  const imageUrlLama = checkId.image;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    // TIDAK PERLU UPLOAD IMAGE UPDATE
    if (req.file == null) {
      const updateArticle = await Artikel.update({ title, categoryContentId, subTitle, content, babyBluesCategoryId }, { where: { id: req.params.id } });
      if (updateArticle) {
        return res.status(200).json({
          code: 200,
          message: 'Article Successfully Updated',
        });
      }
      return res.status(400).json({
        code: 400,
        message: 'Failed to Update Article',
      });
    } else {
      // JIKA UPLOAD IMAGE UPDATE JUGA
      await bucket.file(fileNameYgdiganti).delete();
      if (req.file && req.file.cloudStoragePublicUrl) {
        imageUrl = req.file.cloudStoragePublicUrl;
      }
      const updateArticle = await Artikel.update({ title, categoryContentId, image: imageUrl, subTitle, content, babyBluesCategoryId }, { where: { id: req.params.id } });
      if (updateArticle) {
        return res.status(200).json({
          code: 200,
          message: 'Article Successfully Updated',
        });
      }
      return res.status(400).json({
        code: 400,
        message: 'Failed to Update Article',
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
      error,
    });
  }
};

//  Delete Article
const deleteArticle = async (req, res) => {
  //check ID
  const checkId = await Artikel.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }

  // ambil data image lama
  const imageUrlLama = checkId.image;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    const deleteArticle = Artikel.destroy({
      where: { id: req.params.id },
    });
    const deleteImage = await bucket.file(fileNameYgdiganti).delete();
    if (deleteArticle && deleteImage) {
      return res.status(200).json({
        code: 200,
        message: 'Article Successfully Deleted',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Delete Article',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
    });
  }
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
};
