import { createProject, fetchProject } from '../services/projectService.js';

export const addProject = async (req, res, next) => {
  try {
    const { body, user } = req;
    const result = await createProject(body, user.id);
    return res.status(201).json({ message: 'Project created successfully', data: result });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const projectList = await fetchProject(req.user.id, req.params.id);
    return res.status(200).json({ message: 'Project fetched successfully', data: projectList });
  } catch (error) {
    next(error);
  }
};
