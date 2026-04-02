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
    title: { type: String, required: true, lowercase: true, trim: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);
projectSchema.index({ title: 1, user: 1 }, { unique: true });
projectSchema.index({ user: 1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
