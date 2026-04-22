const express = require('express');
const router = express.Router();
const { getProgress, updateProgress } = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getProgress)
  .put(protect, updateProgress);

module.exports = router;
