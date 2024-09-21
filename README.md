# CALO Assignment

This is a full-stack application that allows users to create jobs, view job lists, and fetch job details, including random images from Unsplash. The application consists of a Node.js backend, a React frontend and Material UI for ui library.

## Features

- **Backend**:

  - Create a new job.
  - Retrieve the status or result of a specific job.
  - Fetch a list of all jobs.
  - Use Unsplash API to fetch random images for jobs.

- **Frontend**:
  - Create a new job using a simple form.
  - Fetch and display the details of a specific job, including its status and result (image).

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn

## Setup Instructions

1. **Clone the Repository**:

   git clone https://github.com/yameen07/calo-fullstack-assignment.git
   cd calo-fullstack-assignment

2. **Backend Setup**:

   - Navigate to the `backend` directory:
     cd backend

   - Install dependencies:
     npm install

   - Start the backend server:
     npm start

3. **Frontend Setup**:

   - Open a new terminal and navigate to the `frontend` directory:
     cd frontend

   - Install dependencies:
     npm install

   - Start the frontend server:
     npm start

4. **Access the Application**:
   - Open your browser and go to `http://localhost:3001` to view the application or go to the url on which frontend is running.

## Running the Application

1. **Backend**:

   - Make sure the backend server is running on `http://localhost:3000`.
   - Make sure you run the backend server first so that it can take port 3000 as its static for now.

2. **Frontend**:

   - Frontend server is running on any port available.

3. **Create a New Job**:

   - Use the form on the homepage to create a new job. The job will appear in the list below.

4. **Fetch Job Details**:
   - Enter a job ID in the `Job Details` section to fetch the status and result of that specific job.

## Time Report

| **Section**                   | **Time Spent** | **Details**                                                                                                                              |
| ----------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Project Setup**             | 1 hour         | Setting up the project structure, creating backend and frontend folders, and configuring initial files.                                  |
| **Backend Development**       | 3.5 hours      | Implementing API endpoints (`POST /jobs`, `GET /jobs`, `GET /jobs/:id`), job processing logic, and file-based storage for job data.      |
| **Frontend Development**      | 3 hours        | Creating React components (`JobList`, `JobDetails`, `NewJobForm`), integrating Material-UI for styling, and setting up state management. |
| **Custom Hooks Development**  | 1.5 hours      | Implementing custom hooks (`useJobs`, `useJobDetails`, `useNewJob`) to manage logic for data fetching and state updates.                 |
| **Testing & Debugging**       | 2 hour         | Testing backend API endpoints with Postman, verifying frontend functionality, and debugging issues.                                      |
| **Styling & UI Enhancements** | 1 hour         | Adding styling to components using Material-UI, implementing scrollable job list, and handling empty states.                             |
| **Documentation**             | 30 minutes     | Writing the README file with project setup instructions, usage, and time report.                                                         |
| **Total**                     | **12.5 hours** |
