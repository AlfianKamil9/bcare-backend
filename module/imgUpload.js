'use strict';
const { Storage } = require('@google-cloud/storage');
const process = require('process');
const path = require('path');
const bucketName = process.env.BUCKET_NAME; // ganti nama bucket
let ImgUpload = {};

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

// ------------------------------------------------------------------------------------ //
// --------------------------- USERS ONLY AREA STARTS HERE ---------------------------- //
//  ----------------------------------------------------------------------------------- //
const pathKeyUser = path.resolve('./serviceAccount/uploadUser.json');
const storageUser = new Storage({
  projectId: process.env.PROJECT_ID, // Ganti dengan ID proyek Google Cloud Anda
  keyFilename: pathKeyUser, // Ganti dengan path ke file kredensial JSON
});
const bucketUser = storageUser.bucket(bucketName);
// prediction
ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = 'screening-image/' + Date.now();
  const file = bucketUser.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};
// upload bukti transfer
ImgUpload.buktiTransfer = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = 'proof-transfer/' + Date.now();
  const file = bucketUser.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

// ADMIN ONLY
// ------------------------------------------------------------------------------------ //
// --------------------------- ADMIN ONLY AREA STARTS HERE ---------------------------- //
//  ----------------------------------------------------------------------------------- //

const pathKey = path.resolve('./serviceAccount/crudAdmin.json');
const storage = new Storage({
  projectId: process.env.PROJECT_ID, // Ganti dengan ID proyek Google Cloud Anda
  keyFilename: pathKey, // Ganti dengan path ke file kredensial JSON
});
const bucket = storage.bucket(bucketName);

ImgUpload.UploadArtikelFromAdmin = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = 'artikel-images/' + Date.now();
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

ImgUpload.UploadKonselorFromAdmin = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = 'konselor/' + Date.now();
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

ImgUpload.UploadKonselingFromAdmin = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = 'konseling/' + Date.now();
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

ImgUpload.UploadVideoFromAdmin = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = 'vidio/' + Date.now();
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
