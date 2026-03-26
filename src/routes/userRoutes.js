import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getUserProfile } from '../controllers/authController.js';

const router = express.Router();

// get logged in user details
router.get('/profile', authMiddleware, getUserProfile);

export default router;
