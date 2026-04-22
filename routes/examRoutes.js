const express = require('express');
const router = express.Router();
const { submitExam, getExams, getAllResults } = require('../controllers/examController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, submitExam)
  .get(protect, getExams);

router.get('/all', protect, getAllResults);

module.exports = router;
