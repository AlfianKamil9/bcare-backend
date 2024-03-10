const express = require('express');
const Multer = require('multer');
const router = express.Router();
const process = require('process');
const artikelController = require('./controller/artikelController');
const categoryContentController = require('./controller/categoryContentController');
const videoController = require('./controller/videoController');
const konselingController = require('./controller/konselingController');
const orderKonselingController = require('./controller/orderKonselingController');
const authController = require('./controller/authController');
const questionController = require('./controller/questionController');
const submitToMLController = require('./controller/submitToMLController');
const jwt = require('jsonwebtoken');
const ImgUpload = require('./module/imgUpload');

// CONTROLLER ADMIN
const adminUsersController = require('./controller/admin/usersController');
const adminArticlesController = require('./controller/admin/artikelController');
const adminVideosController = require('./controller/admin/videoController');
const adminCategoryContents = require('./controller/admin/categoryContentController');
const adminKonselorController = require('./controller/admin/konselorController');
const adminKonselingController = require('./controller/admin/konselingController');
const adminOrderKonselingController = require('./controller/admin/orderKonselingController');

// kONFIGURASI MULTER
const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Batas ukuran file (5 MB dalam contoh ini)
  },
});

const sweagerUI = require('swagger-ui-express');
const apiDocs = require('./apiDocumentation.json');
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const tokenBlacklist = new Set();

// Middleware Login
const authRules = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({
      code: 401,
      message: 'Token is required',
    });
  const token = authorization.split(' ')[1];
  try {
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ code: 401, message: 'Token has been invalidated' });
    }
    const jwtDecode = jwt.verify(token, process.env.TOKEN);
    req.userData = jwtDecode;
    console.log(req.userData);
  } catch (error) {
    return res.status(403).json({ code: 403, message: 'Unathorized' });
  }
  next();
};

// CEK ROLES
const isAdmin = async (req, res, next) => {
  if (req.userData.roles !== 'admin') {
    return res.status(403).json({ code: 403, message: 'Forbidden: Only admin access' });
  }
  next();
};

// SWAGGER ROUTES DOCS
router.use('/api-docs', sweagerUI.serve, sweagerUI.setup(apiDocs));
// ROUTES
router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.post('/api/v1/login', authController.login);
router.post('/api/v1/register', authController.register);
// AUTH
// artikel
router.get('/api/v1/artikel', authRules, artikelController.getAllArtikel);
router.get('/api/v1/artikel/:id', authRules, artikelController.getDetailArtikel);
// prediksi
router.get('/api/v1/questions', authRules, questionController);
router.post('/api/v1/submit-quiz', authRules, submitToMLController.submitQuiz);
router.post('/api/v1/submit-image', authRules, upload.single('file'), ImgUpload.uploadToGcs, submitToMLController.submitImage);
// manage profile
router.get('/api/v1/user', authRules, authController.getUsers);
router.put('/api/v1/user', authRules, authController.updateUsers);
//manage video
router.get('/api/v1/video', authRules, videoController.getAllVideo);
router.get('/api/v1/video/:id', authRules, videoController.getDetailVideo);
// manage category
router.get('/api/v1/category', authRules, categoryContentController.getAllCategoryContent);
router.get('/api/v1/category/:id', authRules, categoryContentController.getDetailCategoryContent);
// manage konseling
router.get('/api/v1/konseling', authRules, konselingController.getAllKonseling);
router.get('/api/v1/konseling/:id', authRules, konselingController.getDetailKonseling);
//pemesanan konsling
router.get('/api/v1/order-konseling', authRules, orderKonselingController.historyOrder);
router.get('/api/v1/order-konseling/:reference_code', authRules, orderKonselingController.detailHistoryOrder);
router.post('/api/v1/order-konseling', authRules, orderKonselingController.createOrderKonseling);
router.put('/api/v1/order-konseling/upload-proof/:reference_code', authRules, upload.single('file'), ImgUpload.buktiTransfer, orderKonselingController.uploadProofTransfer);

// logout
router.delete('/api/v1/logout', authRules, authController.logout);

// ------------------------------------------------------------------------------------ //
// --------------------------- ADMIN ONLY AREA STARTS HERE ---------------------------- //
//  ----------------------------------------------------------------------------------- //

// kelola users
router.get('/api/admin-only/v1/users', authRules, isAdmin, adminUsersController.getAllUsers);
// kelola artikel {CLEAR TINGGAL VALIDASI DAN IMAGE UPLOAD}
router.post('/api/admin-only/v1/article', authRules, isAdmin, upload.single('file'), ImgUpload.UploadArtikelFromAdmin, adminArticlesController.createArticle);
router.put('/api/admin-only/v1/article/:id', authRules, isAdmin, upload.single('file'), ImgUpload.UploadArtikelFromAdmin, adminArticlesController.updateArticle);
router.delete('/api/admin-only/v1/article/:id', authRules, isAdmin, adminArticlesController.deleteArticle);
// kelola vidio
router.post('/api/admin-only/v1/video', authRules, isAdmin, upload.single('file'), ImgUpload.UploadVideoFromAdmin, adminVideosController.createVideo);
router.put('/api/admin-only/v1/video/:id', authRules, isAdmin, upload.single('file'), ImgUpload.UploadVideoFromAdmin, adminVideosController.updateVideo);
router.delete('/api/admin-only/v1/video/:id', authRules, isAdmin, adminVideosController.deleteVideo);
//kelola category content {CLEAR TINGGAL VALIDASI}
router.post('/api/admin-only/v1/category', authRules, isAdmin, adminCategoryContents.createCategoryContent);
router.put('/api/admin-only/v1/category/:id', authRules, isAdmin, adminCategoryContents.updateCategoryContent);
router.delete('/api/admin-only/v1/category/:id', authRules, isAdmin, adminCategoryContents.deleteCategoryContent);
// Kelola konselor
router.get('/api/admin-only/v1/konselor', authRules, isAdmin, adminKonselorController.getAllKonselor);
router.post('/api/admin-only/v1/konselor', authRules, isAdmin, upload.single('file'), ImgUpload.UploadKonselorFromAdmin, adminKonselorController.createKonselor);
router.put('/api/admin-only/v1/konselor/:id', authRules, isAdmin, upload.single('file'), ImgUpload.UploadKonselorFromAdmin, adminKonselorController.updateKonselor);
router.delete('/api/admin-only/v1/konselor/:id', authRules, isAdmin, adminKonselorController.deleteKonselor);
// Kelola daftar konseling
router.post('/api/admin-only/v1/konseling', authRules, isAdmin, upload.single('file'), ImgUpload.UploadKonselingFromAdmin, adminKonselingController.createKonseling);
router.put('/api/admin-only/v1/konseling/:id', authRules, isAdmin, upload.single('file'), ImgUpload.UploadKonselingFromAdmin, adminKonselingController.updateKonseling);
router.delete('/api/admin-only/v1/konseling/:id', authRules, isAdmin, adminKonselingController.deleteKonseling);
// Kelola Order Konseling
router.get('/api/admin-only/v1/order-konseling', authRules, isAdmin, adminOrderKonselingController.getAllOrder);
router.get('/api/admin-only/v1/order-konseling/:status', authRules, isAdmin, adminOrderKonselingController.getAllOrderFromStatus);
router.delete('/api/admin-only/v1/order-konseling/rejecting/:reference_code', authRules, isAdmin, adminOrderKonselingController.rejectingPayment);
router.put('/api/admin-only/v1/order-konseling/accepting/:reference_code', authRules, isAdmin, adminOrderKonselingController.acceptingPayment);

module.exports = router;
