const Analisis = require('../models/Analisis');

// @desc    Submit an analysis
// @route   POST /api/analisis
const submitAnalisis = async (req, res) => {
  try {
    const { tipoAnalisis, descripcion, metricas } = req.body;

    const analisis = await Analisis.create({
      user: req.user._id,
      tipoAnalisis,
      descripcion,
      metricas
    });

    res.status(201).json(analisis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user analyses
// @route   GET /api/analisis
const getAnalisis = async (req, res) => {
  try {
    const analisisList = await Analisis.find({ user: req.user._id }).sort('-fechaAnalisis');
    res.json(analisisList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitAnalisis, getAnalisis };
