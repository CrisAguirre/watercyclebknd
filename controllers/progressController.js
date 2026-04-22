const Progress = require('../models/Progress');

// @desc    Get user progress
// @route   GET /api/progress
const getProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user._id });
    
    if (!progress) {
      // Si no tiene progreso, creamos uno inicial
      progress = await Progress.create({
        user: req.user._id,
        currentSimulationId: 1,
        simulationData: {},
        completedSimulations: []
      });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user progress
// @route   PUT /api/progress
const updateProgress = async (req, res) => {
  try {
    const { currentSimulationId, simulationData, completedSimulation } = req.body;
    
    let progress = await Progress.findOne({ user: req.user._id });
    
    if (!progress) {
      progress = new Progress({ user: req.user._id });
    }

    if (currentSimulationId) progress.currentSimulationId = currentSimulationId;
    if (simulationData) progress.simulationData = simulationData;
    if (completedSimulation && !progress.completedSimulations.includes(completedSimulation)) {
      progress.completedSimulations.push(completedSimulation);
    }
    
    progress.lastSavedAt = Date.now();
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProgress, updateProgress };
