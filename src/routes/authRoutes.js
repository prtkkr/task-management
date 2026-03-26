import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = express.Router();

// register api
router.post('/register', registerUser);

// login api
router.post('/login', loginUser);

// default export
export default router;
