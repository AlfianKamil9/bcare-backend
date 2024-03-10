const { Storage } = require('@google-cloud/storage');
const process = require('process');
const path = require('path');
const pathKey = path.resolve('./serviceAccount/crudAdmin.json');
const storage = new Storage({
  projectId: process.env.PROJECT_ID, // Ganti dengan ID proyek Google Cloud Anda
  keyFilename: pathKey, // Ganti dengan path ke file kredensial JSON
});
const bucket = storage.bucket(process.env.BUCKET_NAME);
// user
const pathKeyUser = path.resolve('./serviceAccount/uploadUser.json');
const storageUser = new Storage({
  projectId: process.env.PROJECT_ID, // Ganti dengan ID proyek Google Cloud Anda
  keyFilename: pathKeyUser, // Ganti dengan path ke file kredensial JSON
});
const bucketUser = storageUser.bucket(process.env.BUCKET_NAME);

async function cariImageLama(imageLama) {
  const imageUrlLama = imageLama;
  const startFilenameLama = imageUrlLama.indexOf('storage-tugas-akhir-gcloud/') + 27;
  const endIndex = imageUrlLama.length;
  const fileNameYgdiganti = imageUrlLama.substring(startFilenameLama, endIndex);
  console.log(fileNameYgdiganti);
  return fileNameYgdiganti;
}

module.exports = {
  storage,
  bucket,
  storageUser,
  bucketUser,
  cariImageLama,
};
