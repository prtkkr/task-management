import Project from '../models/Project.js';
import CustomError from '../utils/CustomError.js';

export const createProject = async (project, userId) => {
  if (!project?.title) throw new CustomError('Project title is required', 400);
  if (!project?.description) throw new CustomError('Project description is required', 400);

  const existingProject = await Project.findOne({ title: project.title, user: userId });
  if (existingProject) {
    throw new CustomError('Project with the same title already exists', 400);
  }

  const newProject = await Project.create({ title: project.title, description: project.description, user: userId });
  return {
    id: newProject._id,
    title: newProject.title,
    description: newProject.description,
    createdAt: newProject.createdAt,
  };
};

export const fetchProject = async (userId, projectId = null) => {
  let list;
  if (projectId) {
    list = await Project.findOne({ _id: projectId, user: userId });
  } else {
    list = await Project.find({ user: userId });
  }
  //   validation for project existence
  if (projectId) {
    if (!list) {
      throw new CustomError('Project not found', 404);
    }
  } else {
    if (list.length === 0) {
      throw new CustomError('Project not found', 404);
    }
  }

  const projectList = Array.isArray(list) ? formatProjectResponse(list) : formatProjectResponse([list]);
  return projectList;
};

export const formatProjectResponse = (response) => {
  const result = response.map((project) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }));
  return result;
};
