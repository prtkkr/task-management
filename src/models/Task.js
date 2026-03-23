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
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    attachment: { type: String },
  },
  { timestamps: true },
);
const Task = mongoose.model('Task', taskSchema);
export default Task;
