import { createProject, deleteProjectService, fetchProject, updateProjectService } from '../services/projectService.js';

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

export const updateProject = async (req, res, next) => {
  try {
    const result = await updateProjectService(req.user.id, req.params.id, req.body);
    return res.status(200).json({ message: 'Project updated successfully', data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await deleteProjectService(req.user.id, req.params.id);
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
