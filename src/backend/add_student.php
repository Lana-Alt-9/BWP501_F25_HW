<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('POST');
require_login();

$data = request_data();
$errors = validate_student($data);

if ($errors !== []) {
    json_response([
        'success' => false,
        'message' => 'يرجى تصحيح الأخطاء أدناه.',
        'errors' => $errors,
    ], 422);
}

$student = student_input($data);

try {
    $picturePath = upload_profile_picture(uploaded_picture());
} catch (RuntimeException $error) {
    json_response([
        'success' => false,
        'message' => $error->getMessage(),
        'errors' => ['profile_picture' => $error->getMessage()],
    ], 422);
}

try {
    $insertStudent = db()->prepare(
        'INSERT INTO students (name, email, phone, address, profile_picture)
         VALUES (?, ?, ?, ?, ?)'
    );

    $insertStudent->execute([
        $student['name'],
        $student['email'],
        $student['phone'],
        $student['address'],
        $picturePath,
    ]);
} catch (Throwable $error) {
    delete_profile_picture($picturePath);
    throw $error;
}

$newStudentId = (int) db()->lastInsertId();

$findStudent = db()->prepare('SELECT * FROM students WHERE id = ?');
$findStudent->execute([$newStudentId]);
$newStudent = $findStudent->fetch();

json_response([
    'success' => true,
    'message' => 'تمت إضافة الطالب بنجاح.',
    'student' => format_student($newStudent),
], 201);
