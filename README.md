final year Project Management system
A full-stack web application designed to streamline mentor–mentee interactions through dedicated workflows for Admin, Mentor, and Mentee users.
The project is built with a modern React + Vite frontend and a Node.js + Express + MongoDB backend, with REST APIs, authentication, validation, feedback management, and scheduled backend cleanup.
---
✨ Highlights
Role-based application flow for Admin, Mentor, and Mentee
Authentication and protected backend APIs
Separate Mentor and Mentee API modules
Feedback management
Admin management endpoints
MongoDB database integration through Mongoose
Password hashing with `bcryptjs`
JWT-based authentication support
Request validation with `express-validator` and `Joi`
CORS-enabled REST API
Scheduled daily cleanup using `node-cron`
Modern React frontend with Vite
Client-side API communication using Axios
Responsive UI support with Bootstrap
ESLint configuration for code quality
---
🧩 Technology Stack
Frontend
Technology	Purpose
React 19	User interface
Vite	Frontend build tool and development server
React Router DOM	Client-side routing
Axios	API communication
Bootstrap 5	UI styling and responsive components
ESLint	Code quality and linting
Backend
Technology	Purpose
Node.js	Server-side runtime
Express 5	REST API framework
MongoDB	Database
Mongoose	MongoDB object modeling
JWT	Authentication
bcryptjs	Password hashing
Joi	Data validation
express-validator	Request validation
CORS	Cross-origin API access
dotenv	Environment variable management
node-cron	Scheduled cleanup tasks
Nodemon	Backend development workflow
---
🏗️ Architecture
```text
┌──────────────────────────────┐
│        React Frontend        │
│        Vite + Axios          │
└──────────────┬───────────────┘
               │
               │ REST API
               ▼
┌──────────────────────────────┐
│       Node.js Backend        │
│       Express + CORS         │
├──────────────────────────────┤
│ Auth │ Admin │ Mentor        │
│ Mentee │ Feedback            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          MongoDB             │
│         Mongoose             │
└──────────────────────────────┘
```
---
🔐 API Structure
The backend organizes functionality into versioned API modules:
```text
/api/v1/auth
/api/v1/admin
/api/v1/mentor
/api/v1/mentee
/api/v1/feedback
```
The Express application also uses centralized error middleware for backend error handling.
---
📁 Project Structure
A typical structure for the project is:
```text
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```
> The exact folders may vary depending on the current project structure.
---
⚙️ Getting Started
1. Clone the repository
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <PROJECT_FOLDER>
```
2. Install frontend dependencies
```bash
cd frontend
npm install
```
3. Start the frontend
```bash
npm run dev
```
The Vite development server will display the local URL in the terminal.
---
🖥️ Backend Setup
Open another terminal and move into the backend directory:
```bash
cd backend
npm install
```
Create your environment file:
```text
.env
```
Add the required configuration for your MongoDB connection, JWT secret, and server port according to your project's environment setup.
Then start the backend:
```bash
npm run dev
```
The backend uses port `5000` by default when `PORT` is not provided through the environment configuration.
---
🔄 Backend Workflow
```text
Client Request
      │
      ▼
Express Router
      │
      ▼
Authentication / Validation
      │
      ▼
Controller / Service
      │
      ▼
MongoDB via Mongoose
      │
      ▼
API Response
```
---
⏰ Automated Cleanup
The backend schedules a cleanup task every day at midnight using `node-cron`.
```text
Daily at 00:00
      │
      ▼
Cleanup Service
      │
      ▼
runCleanup()
```
This functionality is initialized when the backend server starts.
---
🛡️ Security & Validation
The backend includes several security-oriented mechanisms:
Password hashing with `bcryptjs`
JWT authentication support
Input validation
Environment-based configuration
CORS configuration
Centralized error middleware
Protected role-specific API routes
---
📜 Available Scripts
Frontend
```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```
Backend
```bash
npm run dev       # Start backend with Nodemon
```
---
🚀 Production Build
Create the frontend production build:
```bash
cd frontend
npm run build
```
For the backend, configure the production environment variables and start the Node.js server using the appropriate production process manager or deployment platform.
---
🧪 Development Notes
Before running the complete application, make sure:
Node.js is installed
MongoDB is available
Backend environment variables are configured
Frontend dependencies are installed
Backend dependencies are installed
Frontend and backend are running in their respective terminals
---
👨‍💻 Author
Priyanshu Verma
B.Tech – Computer Science & Engineering (Artificial Intelligence)
BBD University, Lucknow
---
📌 Project Status
Active Development
This project is being developed as a full-stack final year project management system solution with role-based workflows and RESTful backend services.
---
⭐ If You Find This Project Useful
Feel free to explore the codebase, improve the existing modules, and extend the platform with additional features such as notifications, analytics, scheduling, messaging, and advanced dashboards.
