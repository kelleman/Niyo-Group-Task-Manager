TASK MANAGEMENT SYSTEM, BACKEND DEVELOPER ASSESSMENT
=======================================================
This is a task management system using Node.js, Express.js.
The system allow only authenticated users to create, read, update and delete tasks. Also a real-time notification system using socket.io that emit events to let other users know when a task has been created.

- POSTMAN DOCUMENTATION URL: https://documenter.getpostman.com/view/21753101/2sA3QmCuER


PROJECT STRUCTURE
=================
task-manager/
├── .env
├── .gitignore
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authControllers.js
    │   └── taskControllers.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── taskRoutes.js
    ├── models/
    │   ├── userModel.js
    │   └── taskModel.js
    └── utils/
        └── socket.utils.js


=> controllers:
- authController.js: Contains logic for registration and login.
- taskControllers.js: Contains logics for handling create task,retrieving all tasks, retrieving a single task by Id, updating task and delete tasks.

=> routes:
- authRoutes.js: Defines API endpoints for authentication and maps them to their corresponding controller functions.
- taskRoutes.js: Defines API endpoints related to task management and maps them to corresponding controller functions.


=> models:
- userModel.js: Defines the Mongoose schema for users, including attributes like fullname, email and password.
- taskModel.js: Defines the Mongoose schema for tasks, including attributes like user, title, description, completed and createdAt.


=> config:
db.js: Configuration file for database connection

=> middlewares:
- authMiddleware.js: the middleware performs authorization checks based on user roles or permissions before allowing access to specific routes.

=> utils
- socket.utils.js: This function enables real-time notifications about newly created tasks to all users.

=> Root Level Files:
- app.js: Entry point of the application where the server is initialized and middleware are configured.
- package.json: Configuration file for npm packages and project metadata.
- .env: Environment variable configuration file containing sensitive data like database credentials and JWT Secret and Port Number.
- .gitignore: Specifies which files and directories should be ignored by version control.

 URLS:
 ====

- local url for postman =http://localhost:5000/api/v1
- remote url: https://task-manager-owiz.onrender.com/api/v1


HOW TO SETUP AND RUN THE APPLICATION:
===========================
=> Environment variables:
MONGODB_URI=
PORT=
JWT_SECRET=


=> Run the following commands in the root directory:
- npm install
- npm start


ENDPOINTS AND USAGE SAMPLE:
==========================
- register
 Method: POST
 local url = http://localhost:5000/api/v1/register
 remote url =https://task-manager-owiz.onrender.com/api/v1/register

 body:
 {
    "fullname": "John Doe",
    "email": "johndoe@gmail.com",
    "password": "password"
 }

- login
Method: POST
local url = http://localhost:5000/api/v1/login
remote url =https://task-manager-owiz.onrender.com/api/v1/login
body:
{
    "email": "johndoe@gmail.com",
    "password": "password"
}

- create-task
Method: POST
local url = http://localhost:5000/api/v1/create-task
remote url =https://task-manager-owiz.onrender.com/api/v1/create-task
body:
{
    "title": "Assessment",
    "description": "This is a backend developer task"
}

- tasks
Method: GET
local url = http://localhost:5000/api/v1/tasks
remote url =https://task-manager-owiz.onrender.com/api/v1/tasks


- task/id
Method: GET
local url = http://localhost:5000/api/v1/task/id
remote url =https://task-manager-owiz.onrender.com/api/v1/task/id
{
    "user": "12345676767676776666"
}

- edit-task/id
Method: UPDATE
local url = http://localhost:5000/api/v1/edit-task/id
remote url =https://task-manager-owiz.onrender.com/api/v1/edit-task/id
{
    "title": "Edited task",
    "description": "This task is edited",
    "completed": true
}
 
- delete-task/id
Method: DELETE
local url = http://localhost:5000/api/v1/delete-task/id
remote url =https://task-manager-owiz.onrender.com/api/v1/delete-task/id
 