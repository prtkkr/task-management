import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUserService = async (requestBody) => {
  let { name, email, password } = requestBody;
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
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(`User ${existingUser.name} already available for email: ${existingUser.email}`);
    return res.status(400).json({ message: 'User already exists' });
  }
  // hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return { name, email, hashedPassword };
};
