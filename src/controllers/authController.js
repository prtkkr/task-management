import { loginUserService, registerUserService, getUserData } from '../services/authService.js';

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(201).json({
      message: 'User registered successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { token, user } = await loginUserService(req.body);
    return res.status(200).json({
      message: 'User authenticated successfully',
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userData = await getUserData(req.user);
    return res.status(200).json({
      message: 'Data retrieved successfully',
      data: {
        user: userData,
      },
    });
  } catch (err) {
    next(err);
  }
};
