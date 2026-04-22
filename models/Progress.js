const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentSimulationId: {
    type: Number,
    default: 1
  },
  simulationData: {
    type: mongoose.Schema.Types.Mixed, // Puede guardar un objeto JSON con el estado exacto (temperatura, etc)
    default: {}
  },
  completedSimulations: [{
    type: Number
  }],
  lastSavedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'watercycle' // Forzar el uso de la colección 'watercycle' existente
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
