# Trainee Mini Project Tracker - Fullstack (Backend + Frontend)

This archive contains a sample Django REST backend and a React + Vite frontend using Axios and Tailwind.

## Backend (Django)
Path: backend/
Requirements listed in backend/requirements.txt

Quick steps:
- python -m venv venv
- source venv/bin/activate  (Windows: venv\Scripts\activate)
- pip install -r backend/requirements.txt
- cd backend
- python manage.py migrate
- python manage.py createsuperuser  (create trainer, set is_staff=True)
- python manage.py create_sample_data
- python manage.py runserver

API is available at http://127.0.0.1:8000/api/mini-projects/

## Frontend (React)
Path: frontend/
- cd frontend
- npm install
- npm run dev
Open the app (usually http://localhost:5173)

## Notes & Teaching tips
- The backend uses Django REST Framework and SimpleJWT for token-based auth.
- Trainer users should have is_staff=True to perform create/update/delete.
- Axios instance (frontend/src/utils/axios.js) demonstrates interceptors for attaching tokens and global error handling.
- The frontend includes multiple pages: Login, Trainee Dashboard, Trainer Dashboard, Project Form (create/edit).
- Sample data created by backend management command: python manage.py create_sample_data

This is a teaching-ready codebase with comments inside files to explain the purpose of each section.
