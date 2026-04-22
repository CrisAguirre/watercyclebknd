const express = require('express');
const router = express.Router();
const { submitAnalisis, getAnalisis } = require('../controllers/analisisController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, submitAnalisis)
  .get(protect, getAnalisis);

module.exports = router;
