import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';

export const registerUserService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new CustomError('All fields are required', 400);
  }
  name = name.trim();
  email = email.trim().toLowerCase();
  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new CustomError('Invalid Email Format', 400);
  }
  // password validation
  if (password.length < 6) {
    throw new CustomError('Password must be at least 6 characters', 400);
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(`User ${existingUser.name} already available for email: ${existingUser.email}`);
    throw new CustomError('User already exists', 400);
  }
  // hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // add user to database
  const newUser = await User.create({ name, email, password: hashedPassword });

  return { id: newUser._id, name: newUser.name, email: newUser.email };
};

export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new CustomError('All fields are required', 400);
  }
  email = email.toLowerCase().trim();
  // fetch details of user
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new CustomError('Invalid credentials', 401);
  }
  // compare passowrd
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    throw new CustomError('Invalid credentials', 401);
  }
  // create jwt token
  const payload = { id: existingUser.id };
  const secretKey = process.env.JWT_SECRET;
  const signOptions = { expiresIn: 3600 };
  const token = jwt.sign(payload, secretKey, signOptions);
  return { token, user: { id: existingUser._id, name: existingUser.name, email: existingUser.email } };
};

export const getUserData = async (user) => {
  const userData = await User.findOne({ _id: user.id });
  if (!userData) {
    throw new CustomError('User not found', 404);
  }
  return {
    name: userData.name,
    email: userData.email,
    id: userData._id,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
  };
};
