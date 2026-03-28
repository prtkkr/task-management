# task-management
A Node JS project where users can register, create projects, manage tasks, upload files, and track activity.

## Features
- User System
    - Register user
    - Login user
    - Password hashing (bcrypt)
    - APIs
        - POST /api/auth/register✅
        - POST /api/auth/login✅
        - GET /api/users/profile✅
- Project management
    - Users can create multiple projects.
    - APIs
        - POST /api/projects✅
        - GET /api/projects
        - GET /api/projects/:id
        - PUT /api/projects/:id
        - DELETE /api/projects/:id
- Task Management
    - Each project contains tasks.
    - APIs
        - POST /api/projects/:projectId/tasks
        - GET /api/projects/:projectId/tasks
        - PUT /api/tasks/:id
        - DELETE /api/tasks/:id
- File Upload
    - Attach files to tasks.
    - APIs
        - POST /api/tasks/:id/upload
- Activity Logs
    - Track actions like (User created task,User updated task,User deleted task)
    - APIs
        - GET /api/projects/:projectId/activity

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)
- multer
- dotenv

## Testing
- Jest
- Supertest