# Student Management System
PTA Web Programming 2025/2026

## Project Overview
A web-based Student Management System with full CRUD (Create, Read, Update, Delete) functionality, built for the Web Programming Practical Exam.

## Features
- Create: Add new students with validation
- Read: View all students in responsive table
- Update: Edit student information
- Delete: Remove students with confirmation
- Real-time: Automatic data sync with Firebase
- Responsive: Works on mobile and desktop

## Technology Stack
- Frontend: React 18 + Vite
- Styling: Tailwind CSS
- Database: Firebase Realtime Database
- Icons: Font Awesome 6
- Deployment: Vercel
- Version Control: Git and GitHub

## Live Demo
https://student-management.vercel.app

## Project Structure

student-management/
├── src/
│ ├── App.jsx # Main application component
│ ├── firebase.js # Firebase configuration
│ ├── index.css # Custom CSS styles
│ └── main.jsx # React entry point
├── public/
│ └── vite.svg # Vite logo
├── index.html # Main HTML with Tailwind CDN
├── package.json # Dependencies list
├── vite.config.js # Vite configuration
└── README.md # This documentation

text

Copy

Download

## Installation and Setup

### 1. Clone Repository
git clone https://github.com/rayasesan/student-management.git
cd student-management

text

Copy

Download

### 2. Install Dependencies
npm install

text

Copy

Download

### 3. Environment Configuration
Create .env.local file in root directory:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

text

Copy

Download

### 4. Run Development Server
npm run dev

text

Copy

Download
Open browser at http://localhost:5173

## Firebase Setup
1. Create Firebase project at firebase.google.com
2. Enable Realtime Database
3. Update configuration in src/firebase.js or environment variables
4. Set database rules for testing:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
How to Use
Add Student: Fill the form and click Add Student

Edit Student: Click Edit button on any student row

Delete Student: Click Delete button (confirmation required)

Data Persistence: All data saved to Firebase cloud database

Deployment
This project is deployed on Vercel with automatic deployment from GitHub main branch.

Author
Name: [Raya Sesan]
Course: Web Programming Practical Exam 2025/2026

License
This project is created for educational purposes as part of the Web Programming 
