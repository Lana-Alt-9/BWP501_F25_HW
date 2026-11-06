BWP501 Student Registration System - Backend
============================================

This folder is the PHP and MySQL backend.
It returns JSON data.
It is not connected to the React frontend.

The README.md in the main folder is only for the React app.
It does not explain the database or the backend.


Requirements
------------
- PHP 8 or newer
- MySQL or MariaDB
- XAMPP or WAMP


Setup
-----
1. Copy the "backend" folder to your local server folder.

   XAMPP:
   C:\xampp\htdocs\backend

   WAMP:
   C:\wamp64\www\backend


2. Start Apache and MySQL.


3. Open phpMyAdmin:

   http://localhost/phpmyadmin


4. Import this file:

   database/schema.sql

   This creates:
   - Database: student_registration_system
   - Table: users
   - Table: students


5. Open this file:

   config/config.php

   Check these values:

   DB_HOST = 127.0.0.1
   DB_PORT = 3306
   DB_NAME = student_registration_system
   DB_USER = root
   DB_PASS = your MySQL password


6. Test the backend:

   http://localhost/backend/session.php

   You should see JSON like this:

   {"success":true,"authenticated":false,"user":null}

   If you see this, the setup is correct.


Run with PHP built-in server
----------------------------
Open a terminal inside the backend folder.

Run:

php -S localhost:8000

Then open:

http://localhost:8000/session.php


Endpoints
---------
POST register.php          Create account
POST login.php             Log in
POST logout.php            Log out
GET  session.php           Check login
POST add_student.php       Add student and picture
GET  view_students.php     List students or get one
POST update_student.php    Update student
POST delete_student.php    Delete student
POST ajax_validate.php     Check form fields

Student endpoints need login first.

Use Postman to send POST requests.

Send JSON for:
- register.php
- login.php
- delete_student.php
- ajax_validate.php

Send form-data for:
- add_student.php
- update_student.php

The picture is optional.


How to use
----------
1. Register a user with register.php.
2. Log in with login.php.
3. The login response sets a session cookie.
4. Send the same cookie to the student endpoints.
5. Add, view, update, and delete students.
6. Log out with logout.php.


Uploads
-------
Profile pictures are saved in:

backend/uploads/

The folder is created automatically.

Allowed file types:
- JPG
- PNG
- WebP

Maximum size: 2 MB.


Security
--------
- Passwords are hashed. Plain passwords are not saved.
- SQL queries use PDO prepared statements.
- Login uses PHP sessions.
- Student endpoints return 401 if there is no session.
- Uploaded file type and size are checked.


Database
--------
File:

database/schema.sql

Tables:

users
- id
- username
- email
- password
- created_at

students
- id
- name
- email
- phone
- address
- profile_picture
- created_at
