const { Konseling } = require('../../models');
const { bucket } = require('../../module/storageSetUp');
const { cariImageLama } = require('../../module/storageSetUp');
let imageUrl;

const createKonseling = async (req, res) => {
  const { konselorId, babyBluesCategoryId, title_konseling, deskripsi_konseling, harga_konseling } = req.body;
  try {
    // input image
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    }
    const createKonseling = await Konseling.create({
      konselorId,
      babyBluesCategoryId,
      title_konseling,
      image_konseling: imageUrl,
      deskripsi_konseling,
      harga_konseling,
    });
    if (createKonseling) {
      return res.status(201).json({ code: 201, message: 'Konseling Successfully Created' });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Create Konseling',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error ' + error,
    });
  }
};

const updateKonseling = async (req, res) => {
  const { konselorId, babyBluesCategoryId, title_konseling, deskripsi_konseling, harga_konseling } = req.body;
  //check ID
  const checkId = await Konseling.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }

  // ambil data image lama
  const imageUrlLama = checkId.image_konseling;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    // KONDISI TIDAK GANTI IMAGE
    if (req.file == null) {
      const updateKonseling = await Konseling.update(
        {
          konselorId,
          babyBluesCategoryId,
          title_konseling,
          deskripsi_konseling,
          harga_konseling,
        },
        { where: { id: req.params.id } }
      );
      if (updateKonseling) {
        return res.status(200).json({ code: 200, message: 'Konseling Successfully Updated' });
      }
      return res.status(400).json({
        code: 400,
        message: 'Failed to Update Konseling',
      });
    } else {
      // input image
      if (req.file && req.file.cloudStoragePublicUrl) {
        imageUrl = req.file.cloudStoragePublicUrl;
      }
      // JIKA UPLOAD IMAGE UPDATE JUGA
      await bucket.file(fileNameYgdiganti).delete();
      const updateKonseling = await Konseling.update(
        {
          konselorId,
          babyBluesCategoryId,
          title_konseling,
          image_konseling: imageUrl,
          deskripsi_konseling,
          harga_konseling,
        },
        { where: { id: req.params.id } }
      );
      if (updateKonseling) {
        return res.status(200).json({ code: 200, message: 'Konseling Successfully Updated' });
      }
      return res.status(400).json({
        code: 400,
        message: 'Failed to Update Konseling',
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error ' + error,
    });
  }
};

const deleteKonseling = async (req, res) => {
  //check ID
  const checkId = await Konseling.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }

  // ambil data image lama
  const imageUrlLama = checkId.image_konseling;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    const deleteKonseling = await Konseling.destroy({
      where: { id: req.params.id },
    });
    const deleteImage = await bucket.file(fileNameYgdiganti).delete();
    if (deleteKonseling && deleteImage) {
      return res.status(200).json({ code: 200, message: 'Successfully deleted data' });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Delete Data',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error ' + error,
    });
  }
};

module.exports = {
  createKonseling,
  updateKonseling,
  deleteKonseling,
};
