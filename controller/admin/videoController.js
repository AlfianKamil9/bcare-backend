const { Video } = require('../../models');
const { bucket } = require('../../module/storageSetUp');
const { cariImageLama } = require('../../module/storageSetUp');
let imageUrl;

const createVideo = async (req, res) => {
  const { title_video, link_video, deskripsi_video, babyBluesCategoryId, categoryContentId } = req.body;
  try {
    // input image
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    }

    const createVideo = await Video.create({
      title_video,
      link_video,
      deskripsi_video,
      thumbnail_video: imageUrl,
      babyBluesCategoryId,
      categoryContentId,
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (createVideo) {
      return res.status(201).json({
        code: 201,
        message: 'Video Successfully Created',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed to Create Video',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
    });
  }
};

const updateVideo = async (req, res) => {
  const { title_video, link_video, deskripsi_video, babyBluesCategoryId, categoryContentId } = req.body;
  //check ID
  const checkId = await Video.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }
  // ambil data image lama
  const imageUrlLama = checkId.thumbnail_video;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    // TIDAK PERLU UPLOAD IMAGE UPDATE
    if (req.file == null) {
      const updateVideo = await Video.update(
        {
          title_video,
          link_video,
          deskripsi_video,
          categoryContentId,
          babyBluesCategoryId,
        },
        { where: { id: req.params.id } }
      );
      if (updateVideo) {
        return res.status(200).json({
          code: 200,
          message: 'Video Successfully Updated',
        });
      }
      return res.status(400).json({
        code: 400,
        message: 'Failed to Update Video',
      });
    } else {
      // JIKA UPLOAD IMAGE UPDATE JUGA
      await bucket.file(fileNameYgdiganti).delete();
      if (req.file && req.file.cloudStoragePublicUrl) {
        imageUrl = req.file.cloudStoragePublicUrl;
      }
      const updateVideo = await Video.update(
        {
          title_video,
          link_video,
          deskripsi_video,
          thumbnail_video: imageUrl,
          categoryContentId,
          babyBluesCategoryId,
        },
        { where: { id: req.params.id } }
      );
      if (updateVideo) {
        return res.status(200).json({
          code: 200,
          message: 'Video Successfully Updated',
        });
      }
      return res.status(400).json({
        code: 400,
        message: 'Failed to Update Video',
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
    });
  }
};

const deleteVideo = async (req, res) => {
  //check ID
  const checkId = await Video.findByPk(req.params.id);
  if (!checkId) {
    return res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    });
  }

  // ambil data image lama
  const imageUrlLama = checkId.thumbnail_video;
  const fileNameYgdiganti = await cariImageLama(imageUrlLama);

  try {
    const deleteVideo = Video.destroy({
      where: { id: req.params.id },
    });
    const deleteImage = await bucket.file(fileNameYgdiganti).delete();
    if (deleteVideo && deleteImage) {
      return res.status(200).json({
        code: 200,
        message: 'Video Successfully Deleted',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Failed To Delete Video',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
    });
  }
};

module.exports = {
  createVideo,
  updateVideo,
  deleteVideo,
};
