import express from 'express';
import AuthRoute from './routes/authRoutes.js';
import ProjectRoute from './routes/projectRoutes.js';
import TaskRoute from './routes/taskRoutes.js';
import UserRoute from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
app.use('/api/projects', ProjectRoute);
app.use('/api/tasks', TaskRoute);
// global error handler
app.use(errorHandler);

export default app;
