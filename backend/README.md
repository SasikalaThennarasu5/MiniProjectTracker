# Backend (Django + DRF) - Trainee Mini Project Tracker

## Setup (quick)
1. Create virtualenv and activate it.
2. pip install -r requirements.txt
3. python manage.py migrate
4. python manage.py createsuperuser (optional, create trainer)
5. python manage.py create_sample_data
6. python manage.py runserver

API endpoints:
- POST /api/token/  -> obtain JWT (username, password)
- GET /api/mini-projects/ -> list projects (requires Authorization: Bearer <token>)
- Standard CRUD at /api/mini-projects/<id>/

Trainer/admin users should have `is_staff=True` to create/edit/delete projects.
