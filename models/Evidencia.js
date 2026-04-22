const mongoose = require('mongoose');

const evidenciaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  titulo: {
    type: String,
    required: true
  },
  archivoUrl: {
    type: String, // Aquí se guardará la URL de Cloudinary
    required: false
  },
  tipoArchivo: {
    type: String, // 'pdf', 'image', 'word', 'texto', etc.
    required: true
  },
  contenido: {
    type: String, // Para evidencias de texto (foro, conclusiones)
    required: false
  },
  cloudinaryId: {
    type: String, // Para poder borrarlo después si se requiere
    required: false
  },
  fechaSubida: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'evidencias'
});

const Evidencia = mongoose.model('Evidencia', evidenciaSchema);
module.exports = Evidencia;
