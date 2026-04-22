const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  examName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  answers: [{
    questionId: String,
    providedAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean
  }],
  takenAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'exams' // Forzar colección
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
