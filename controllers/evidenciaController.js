const Evidencia = require('../models/Evidencia');

// @desc    Upload file and save evidence
// @route   POST /api/evidencias
const uploadEvidencia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    const { titulo, tipoArchivo } = req.body;

    const evidencia = await Evidencia.create({
      user: req.user._id,
      titulo: titulo || req.file.originalname,
      archivoUrl: req.file.path, // URL generada por Cloudinary
      tipoArchivo: tipoArchivo || req.file.mimetype,
      cloudinaryId: req.file.filename // Public ID en Cloudinary
    });

    res.status(201).json(evidencia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all user evidences
// @route   GET /api/evidencias
const getEvidencias = async (req, res) => {
  try {
    const evidencias = await Evidencia.find({ user: req.user._id }).sort('-fechaSubida');
    res.json(evidencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save text-only evidence (Foro/Conclusiones)
// @route   POST /api/evidencias/texto
const saveTextEvidencia = async (req, res) => {
  try {
    const { titulo, contenido, tipoArchivo } = req.body;

    if (!contenido) {
      return res.status(400).json({ message: 'El contenido es obligatorio' });
    }

    const evidencia = await Evidencia.create({
      user: req.user._id,
      titulo,
      contenido,
      tipoArchivo: tipoArchivo || 'texto',
    });

    res.status(201).json(evidencia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadEvidencia, getEvidencias, saveTextEvidencia };
