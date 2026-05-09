require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos...');

    // Eliminar todos los usuarios existentes
    await User.deleteMany({});
    console.log('Todos los usuarios anteriores han sido eliminados.');

    // Eliminar todos los índices de la colección y recrear solo los del Schema
    try {
      await User.collection.dropIndexes();
      await User.syncIndexes();
      console.log('Índices limpios y sincronizados.');
    } catch (e) {
      console.log('Error sincronizando índices:', e);
    }

    const users = [
      {
        name: 'Administrador',
        email: 'krontroth@gmail.com',
        password: '987987987',
        role: 'administrador'
      },
      {
        name: 'Profesor',
        email: 'docente@mail.com',
        password: '1234567890',
        role: 'profesor'
      },
      {
        name: 'Estudiante',
        email: 'ciclodelagua@mail.com',
        password: '1234567',
        role: 'estudiante'
      }
    ];

    for (const u of users) {
      await User.create(u);
    }
    
    console.log('Usuarios creados con éxito.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedData();
