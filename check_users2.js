const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({}, 'email role name');
    console.log('Users in DB:');
    users.forEach(u => console.log(`- ${u.name} (${u.email}) - Role: ${u.role}`));
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();
