const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, role, accessCode } = req.body;

  try {
    // Validar código de acceso según el rol
    if (role === 'profesor') {
      if (accessCode !== '2026@PS-CAA') {
        return res.status(400).json({ message: 'Código de acceso para profesor inválido.' });
      }
    } else if (role === 'estudiante') {
      if (accessCode !== '2026#CAA-PS') {
        return res.status(400).json({ message: 'Código de acceso para estudiante inválido.' });
      }
    } else {
      return res.status(400).json({ message: 'Rol inválido o código de acceso faltante.' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'estudiante'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Registrar historial de login
      user.loginHistory.push({
        loginTime: new Date(),
        ipAddress: req.ip || req.connection.remoteAddress
      });
      await user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile & login history
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login or create guest user (no credentials required)
// @route   POST /api/auth/guest
const guestLogin = async (req, res) => {
  try {
    const guestEmail = 'invitado@watercycle.app';

    // Buscar si ya existe el usuario invitado
    let guest = await User.findOne({ email: guestEmail });

    if (!guest) {
      // Crear el usuario invitado una sola vez
      guest = await User.create({
        name: 'Invitado',
        email: guestEmail,
        password: Math.random().toString(36) + Math.random().toString(36), // contraseña aleatoria, nunca se usa
        role: 'estudiante'
      });
    }

    // Registrar historial de login
    guest.loginHistory.push({
      loginTime: new Date(),
      ipAddress: req.ip || req.connection.remoteAddress
    });
    await guest.save();

    res.json({
      _id: guest._id,
      name: guest.name,
      email: guest.email,
      role: guest.role,
      isGuest: true,
      token: generateToken(guest._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, authUser, getUserProfile, guestLogin };
