const User = require('../models/User');

// @desc    Get all users based on requester's role
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const requesterRole = req.user.role;

    let users = [];

    if (requesterRole === 'administrador') {
      // Administrador ve a todos excepto a sí mismo (opcional, o ve a todos)
      users = await User.find({}).select('-password');
    } else if (requesterRole === 'profesor') {
      // Profesor ve solo a los estudiantes
      users = await User.find({ role: 'estudiante' }).select('-password');
    } else {
      return res.status(403).json({ message: 'No autorizado para ver la lista de usuarios' });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers };
