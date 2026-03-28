import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addProject, getProject } from '../controllers/projectController.js';
const router = express.Router();

// Add project routes here
router.post('/', authMiddleware, addProject);
router.get('/', authMiddleware, getProject);
router.get('/:id', authMiddleware, getProject);

export default router;
