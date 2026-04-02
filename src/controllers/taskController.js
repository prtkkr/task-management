import { createTask } from '../services/projectService.js';

export const addTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { body, user } = req;
    const result = await createTask(projectId, user.id, body);
    return res.status(201).json({ message: 'Task created successfully', data: result });
  } catch (error) {
    next(error);
  }
};
