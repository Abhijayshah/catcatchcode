const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  await connectDB();

  try {
    const userExists = await User.findOne({ email: 'admin@example.com' });

    if (userExists) {
      console.log('Admin user already exists'.yellow);
      process.exit();
    }

    const user = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    console.log('Admin user created successfully'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

seedAdmin();
