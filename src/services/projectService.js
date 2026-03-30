import Project from '../models/Project.js';
import CustomError from '../utils/CustomError.js';

export const createProject = async (project, userId) => {
  let { title, description } = project;
  title = title ? title.trim() : undefined;
  description = description ? description.trim() : undefined;

  if (!title) throw new CustomError('Project title is required', 400);
  if (!description) throw new CustomError('Project description is required', 400);

  const existingProject = await Project.findOne({ title: title, user: userId });
  if (existingProject) {
    throw new CustomError('Project with the same title already exists', 400);
  }

  const newProject = await Project.create({ title: title, description: description, user: userId });
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

export const updateProjectService = async (userId, projectId, project) => {
  let { title, description } = project;
  title = title ? title.trim() : undefined;
  description = description ? description.trim() : undefined;

  if (!title && !description) {
    throw new CustomError('At least one field is required for update', 400);
  }

  // validation for project existence and ownership
  const existingProject = await Project.findOne({ _id: projectId, user: userId });
  if (!existingProject) {
    throw new CustomError('Project not found', 404);
  }

  if (title) {
    // validate if the updated title is unique for the user
    const duplicateProject = await Project.findOne({ title: title, user: userId, _id: { $ne: projectId } });
    if (duplicateProject) {
      throw new CustomError('Project with the same title already exists', 400);
    }
    existingProject.title = title;
  }

  if (description) {
    existingProject.description = description;
  }

  const updatedProject = await existingProject.save();

  return {
    id: updatedProject._id,
    title: updatedProject.title,
    description: updatedProject.description,
    createdAt: updatedProject.createdAt,
    updatedAt: updatedProject.updatedAt,
  };
};

export const deleteProjectService = async (userId, projectId) => {
  const result = await Project.findOneAndDelete({ _id: projectId, user: userId });
  if (!result) {
    throw new CustomError('Failed to delete project', 500);
  }
  return;
};
