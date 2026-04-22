const express = require('express');
const router = express.Router();
const { uploadEvidencia, getEvidencias } = require('../controllers/evidenciaController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

router.route('/')
  .post(protect, upload.single('archivo'), uploadEvidencia)
  .get(protect, getEvidencias);

module.exports = router;
