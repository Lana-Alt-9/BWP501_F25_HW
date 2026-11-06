<?php

const DB_HOST = '127.0.0.1';
const DB_PORT = 3306;
const DB_NAME = 'student_registration_system';
const DB_USER = 'root';
const DB_PASS = '';

const STUDENTS_PER_PAGE = 10;
const MAX_PICTURE_BYTES = 2 * 1024 * 1024;

const UPLOAD_DIR = __DIR__ . '/../uploads';
const UPLOAD_URL = 'uploads';

const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
];
