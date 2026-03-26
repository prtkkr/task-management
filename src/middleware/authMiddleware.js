import CustomError from '../utils/CustomError.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new CustomError('Unauthorized', 401);
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new CustomError('Unauthorized', 401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new CustomError('Unauthorized', 401);
    }
    req.user = user;
    next();
  });
};
