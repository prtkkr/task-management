import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    name = name.trim();
    email = email.trim().toLowerCase();
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid Email Format' });
    }
    // password validation
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    console.log('Existing user: ', existingUser.name);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
