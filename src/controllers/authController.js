import User from '../models/User.js';
import { registerUserService } from '../services/authService.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, hashedPassword } = await registerUserService(req.body);

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
