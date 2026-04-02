import Project from '../models/Project.js';
import Task from '../models/Task.js';
import CustomError from '../utils/CustomError.js';

export const createProject = async (project, userId) => {
  let { title, description } = project;

  title = title ? title.trim() : undefined;
  description = description ? description.trim() : undefined;

  if (!title) throw new CustomError('Project title is required', 400);
  if (!description) throw new CustomError('Project description is required', 400);

  try {
    const newProject = await Project.create({ title: title, description: description, user: userId });
    return {
      id: newProject._id,
      title: newProject.title,
      description: newProject.description,
      createdAt: newProject.createdAt,
      updatedAt: newProject.updatedAt,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new CustomError('Project with the same title already exists for this user', 400);
    }
    throw error;
  }
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

// tasks
export const createTask = async (projectId, userId, taskData) => {
  const projectExists = await Project.exists({ _id: projectId, user: userId });
  if (!projectExists) {
    throw new CustomError('Project not found', 404);
  }

  let { title, description, status, assignedTo, dueDate, attachment } = taskData;

  title = title ? title.trim() : undefined;
  description = description ? description.trim() : undefined;

  if (!title) throw new CustomError('Task title is required', 400);
  if (!description) throw new CustomError('Task description is required', 400);

  try {
    const newTask = await Task.create({
      title,
      description,
      status,
      project: projectId,
      assignedTo,
      dueDate,
      attachment,
    });
    return {
      id: newTask._id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
      attachments: newTask.attachments,
      createdAt: newTask.createdAt,
      updatedAt: newTask.updatedAt,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new CustomError('Task with the same title already exists in this project', 400);
    }
    throw error;
  }
};
