const express = require('express');
const router = express.Router();
const { submitExam, getExams } = require('../controllers/examController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, submitExam)
  .get(protect, getExams);

module.exports = router;
