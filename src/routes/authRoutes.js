import express from 'express';
import { registerUser } from '../controllers/authController.js';
const router = express.Router();

// register api
router.post('/register', registerUser);

// default export
export default router;
