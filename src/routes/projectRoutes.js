import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addProject, deleteProject, getProject, updateProject } from '../controllers/projectController.js';
import { addTask } from '../controllers/taskController.js';
const router = express.Router();

// Add project routes here
router.post('/', authMiddleware, addProject);
router.get('/', authMiddleware, getProject);
router.get('/:id', authMiddleware, getProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

// Task routes
router.post('/:projectId/tasks', authMiddleware, addTask);

export default router;
