const Exam = require('../models/Exam');

// @desc    Submit an exam
// @route   POST /api/exams
const submitExam = async (req, res) => {
  try {
    const { examName, score, answers } = req.body;

    // Verificar cantidad de intentos previos
    const attempts = await Exam.countDocuments({ user: req.user._id, examName });
    if (attempts >= 2) {
      return res.status(400).json({ message: 'Has alcanzado el límite máximo de 2 intentos para esta evaluación.' });
    }

    const exam = await Exam.create({
      user: req.user._id,
      examName,
      score,
      answers
    });

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user exams
// @route   GET /api/exams
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ user: req.user._id }).sort('-takenAt');
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
// @desc    Get all exam results (Admin/Profesor only)
// @route   GET /api/exams/all
const getAllResults = async (req, res) => {
  try {
    if (req.user.role !== 'administrador' && req.user.role !== 'profesor') {
      return res.status(403).json({ message: 'No autorizado para ver resultados globales' });
    }

    const exams = await Exam.find({})
      .populate('user', 'name email')
      .sort('-takenAt');
    
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitExam, getExams, getAllResults };
