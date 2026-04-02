/* Task
 * ├── _id
 * ├── title (String, required)
 * ├── description (String)
 * ├── status (String: "todo" | "in-progress" | "done")
 * ├── project (ObjectId → reference to Project)
 * ├── assignedTo (ObjectId → reference to User, optional)
 * ├── dueDate (Date, optional)
 * ├── attachment (String → file path)
 * ├── createdAt
 * ├── updatedAt
 * */

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, lowercase: true, trim: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    attachment: { type: String },
  },
  { timestamps: true },
);
taskSchema.index({ project: 1 }); // index to optimize queries by project
taskSchema.index({ status: 1 }); // index to optimize queries by status
taskSchema.index({ title: 1, project: 1 }, { unique: true }); // unique index to prevent duplicate task titles within the same project
const Task = mongoose.model('Task', taskSchema);
export default Task;
