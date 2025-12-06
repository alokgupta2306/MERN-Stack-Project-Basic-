# Workout Buddy - MERN Stack App

A web app to track workouts. Users signup, login, add workouts, and delete them.

## Live Links

- Frontend: https://mern-basic.netlify.app/
- Backend: https://mern-stack-project-basic.onrender.com
- GitHub: https://github.com/alokgupta2306/MERN-Stack-Project-Basic-

## What It Does

Users can:
- Create account with email and password
- Login securely
- Add workout (title, weight, reps)
- View all workouts
- Delete workouts
- Logout

## Tech Used

Frontend: React, React Router, Context API, CSS
Backend: Node.js, Express, MongoDB, Mongoose
Auth: JWT, Bcrypt
Hosting: Netlify (frontend), Render (backend)

## Project Folder Structure

```
backend/
  - controllers/ (signup/login/workout logic)
  - middleware/ (authentication check)
  - models/ (user & workout schema)
  - routes/ (API endpoints)
  - server.js (main file)

frontend/
  - components/ (Navbar, WorkoutForm, WorkoutDetails)
  - context/ (AuthContext, WorkoutContext)
  - hooks/ (useLogin, useSignup, etc)
  - pages/ (Home, Login, Signup)
  - App.js (main component)
```

## Setup Locally

1. Clone repo:
```
git clone https://github.com/alokgupta2306/MERN-Stack-Project-Basic-.git
cd MERN-Stack-Project-Basic
```

2. Backend setup:
```
cd backend
npm install
```
Create .env file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
SECRET=your_secret
NODE_ENV=development
```
Run: `npm start` (runs on http://localhost:5000)

3. Frontend setup:
```
cd frontend
npm install
```
Create .env file:
```
REACT_APP_API_URL=http://localhost:5000
```
Run: `npm start` (opens http://localhost:3000)

## How to Use

1. Click Signup
2. Enter email and password (8+ chars, uppercase, lowercase, number)
3. Click Sign Up
4. Add workout (title, load, reps)
5. See it in list
6. Click trash to delete
7. Click Logout

## API Endpoints

POST /api/user/signup - Register
POST /api/user/login - Login
GET /api/workouts - Get all workouts (need token)
POST /api/workouts - Add workout (need token)
DELETE /api/workouts/:id - Delete workout (need token)

## Problems Faced & Fixed

1. MongoDB timeout → Whitelisted IP in MongoDB Atlas
2. CORS error → Added CORS middleware in backend
3. Password safety → Used Bcrypt to hash passwords
4. Unprotected routes → Added JWT middleware
5. Bad data → Added validation on frontend & backend
6. Logout on refresh → Saved user in localStorage
7. Data passing → Used Context API
8. Different URLs → Used environment variables

## Deployment

Backend (Render):
- Connect GitHub repo
- Root: backend
- Build: npm install
- Start: npm start
- Add env variables

Frontend (Netlify):
- Connect GitHub repo
- Base: frontend
- Build: npm run build
- Publish: build
- Add REACT_APP_API_URL env variable

## Database

User: email, password, timestamps
Workout: title, load, reps, user_id, timestamps

## Author

Alok Gupta - https://github.com/alokgupta2306

## Status

✅ Live and deployed!
