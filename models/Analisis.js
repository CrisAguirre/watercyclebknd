const mongoose = require('mongoose');

const analisisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tipoAnalisis: {
    type: String, // 'Cualitativo' o 'Cuantitativo'
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  metricas: {
    type: mongoose.Schema.Types.Mixed, // Para guardar métricas dinámicas (tiempo, puntajes, etc)
    default: {}
  },
  fechaAnalisis: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'analisis'
});

const Analisis = mongoose.model('Analisis', analisisSchema);
module.exports = Analisis;
