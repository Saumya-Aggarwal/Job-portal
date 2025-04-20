# Job Portal

A full-stack job portal web application where job seekers can browse and apply for jobs, and recruiters can post and manage job listings.

## Features

- **User Authentication:** Secure registration and login for job seekers and recruiters.
- **Role-Based Access:** Separate dashboards and permissions for applicants and recruiters.
- **Job Listings:** Browse, search, and filter jobs by keyword.
- **Job Application:** Apply for jobs and track application status.
- **Recruiter Dashboard:** Post, edit, and delete job listings.
- **Company Management:** Manage company profiles and job postings.
- **Responsive UI:** Mobile-friendly and modern design.
- **Error Handling:** Real-time feedback for user actions and errors.

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT, HTTP-only cookies
- **Deployment:** Vercel (frontend), Render (backend)
- **Other:** Axios, React Router

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` directory with the following variables:

  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

- Start the backend server:

  ```bash
  npm run dev
  ```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (or your configured port).

## API Endpoints

- `POST /user/register` - Register a new user
- `POST /user/login` - Login
- `GET /job/all` - Get all jobs (public)
- `POST /job/create` - Create a job (recruiter only)
- `PUT /job/update/:id` - Update a job (recruiter only)
- `DELETE /job/:id` - Delete a job (recruiter only)
- `GET /job/:id` - Get job details
- ...and more

## Deployment

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render

## What I Learned

- Building scalable REST APIs with authentication and role-based access
- Managing state and async actions with Redux
- Handling CORS, cookies, and secure authentication flows
- Deploying full-stack applications and troubleshooting deployment issues

## License

This project is licensed under the MIT License.

---

**Feel free to contribute or open issues!**
