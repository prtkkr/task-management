/* Project
 * ├── _id
 * ├── title (String, required)
 * ├── description (String)
 * ├── user (ObjectId → reference to User)
 * ├── createdAt
 * ├── updatedAt
 */

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);
const Project = mongoose.model('Project', projectSchema);
export default Project;
