# MERN Portfolio Application

A professional full-stack MERN (MongoDB, Express, React, Node.js) portfolio application with an admin dashboard, blog system, and advanced features.

## Features

- **Responsive Frontend**: Built with React, Vite, and Tailwind CSS.
- **Dynamic Backend**: RESTful API built with Express.js and Node.js.
- **Database Integration**: MongoDB for storing projects and blog posts.
- **Admin Dashboard**: Protected routes with JWT authentication for managing projects and blogs.
- **Blog System**: Full CRUD functionality for blog posts with Markdown support.
- **Advanced Features**:
  - Dark/Light mode toggle.
  - Image uploads using Cloudinary.
  - Smooth animations with Framer Motion.
- **Deployment Ready**: Optimized for deployment on Render.

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Framer Motion, Lucide-React, Axios, React Markdown.
- **Backend**: Node.js, Express.js, Mongoose, JWT, Bcryptjs, Multer, Cloudinary.
- **Database**: MongoDB Atlas.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- A MongoDB Atlas cluster.
- A Cloudinary account for image uploads.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Step 2: Backend Configuration

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

### Step 3: Frontend Configuration

1.  Navigate to the `frontend` folder:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

### Step 4: Run the Application

Navigate back to the root directory and run:
```bash
npm run dev
```
This will start both the frontend and backend concurrently.

- Frontend will be running at `http://localhost:5173`
- Backend will be running at `http://localhost:5000`

## Admin Access

To access the admin dashboard, you'll need to create an admin user. You can do this by registering a new user at `POST /api/users` (which defaults to admin in this specific setup for demo purposes) and then logging in at `/login` on the frontend.
