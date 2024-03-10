const { konselor } = require('../../models');
const { bucket } = require('../../module/storageSetUp');
const { cariImageLama } = require('../../module/storageSetUp');
let imageUrl;

const getAllKonselor = async (req, res) => {
  const getAllKonselor = await konselor.findAll();
  try {
    return res.status(200).json({
      code: 200,
      message: 'Successfully fetched all Konselor',
      data: getAllKonselor,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error ' + error,
    });
  }
};

const createKonselor = async (req, res) => {
  const { name_konselor, email_konselor, deskripsi_konselor } = req.body;
  try {
    // input image
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    }

    const createKonselor = await konselor.create({
      name_konselor,
      email_konselor,
      deskripsi_konselor,
      profile_konselor: imageUrl,
    });
    if (createKonselor) {
      return res.status(201).json({
        code: 201,
        message: 'Konselor data Successfully Created',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Create Konselor Data',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error, ' + error,
    });
  }
};

const updateKonselor = async (req, res) => {
  const { name_konselor, email_konselor, deskripsi_konselor } = req.body;
  //check ID
  const checkId = await konselor.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }

  // ambil data image lama
  const imageUrlLama = checkId.profile_konselor;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    if (req.file == null) {
      const updateKonselor = await konselor.update(
        {
          name_konselor,
          email_konselor,
          deskripsi_konselor,
        },
        { where: { id: req.params.id } }
      );
      if (updateKonselor) {
        return res.status(201).json({
          code: 200,
          message: 'Konselor data Successfully Updated',
        });
      }
      return res.status(400).json({
        code: 400,
        message: ' Failed to Update Konselor Data',
      });
    } else {
      // hapus file lama
      await bucket.file(fileNameYgdiganti).delete();

      if (req.file && req.file.cloudStoragePublicUrl) {
        imageUrl = req.file.cloudStoragePublicUrl;
      }

      const updateKonselor = await konselor.update(
        {
          name_konselor,
          email_konselor,
          deskripsi_konselor,
          profile_konselor: imageUrl,
        },
        { where: { id: req.params.id } }
      );
      if (updateKonselor) {
        return res.status(201).json({
          code: 200,
          message: 'Konselor data Successfully Updated',
        });
      }
      return res.status(400).json({
        code: 400,
        message: ' Failed to Update Konselor Data',
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error, ' + error,
    });
  }
};

const deleteKonselor = async (req, res) => {
  //check ID
  const checkId = await konselor.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }

  const imageUrlLama = checkId.profile_konselor;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    const deleteImage = await bucket.file(fileNameYgdiganti).delete();
    const deleteKonselor = await konselor.destroy({
      where: { id: req.params.id },
    });
    if (deleteKonselor && deleteImage) {
      return res.status(200).json({
        code: 200,
        message: 'Successfully deleted the data',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Delete',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error ' + error,
    });
  }
};

module.exports = {
  getAllKonselor,
  createKonselor,
  updateKonselor,
  deleteKonselor,
};
