import express from 'express';
import AuthRoute from './routes/authRoutes.js';
import ProjectRoute from './routes/projectRoutes.js';
import TaskRoute from './routes/taskRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', AuthRoute);
app.use('/api/projects', ProjectRoute);
app.use('/api/tasks', TaskRoute);

export default app;
