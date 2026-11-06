<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('POST');
require_login();

$data = request_data();
$id = int_input($data, 'id');

if ($id < 1) {
    json_response([
        'success' => false,
        'message' => 'معرّف الطالب غير صالح.',
    ], 422);
}

$findStudent = db()->prepare('SELECT * FROM students WHERE id = ?');
$findStudent->execute([$id]);
$existingStudent = $findStudent->fetch();

if (!$existingStudent) {
    json_response([
        'success' => false,
        'message' => 'الطالب غير موجود.',
    ], 404);
}

$errors = validate_student($data);

if ($errors !== []) {
    json_response([
        'success' => false,
        'message' => 'يرجى تصحيح الأخطاء أدناه.',
        'errors' => $errors,
    ], 422);
}

$student = student_input($data);
$picturePath = $existingStudent['profile_picture'];
$newPicturePath = null;

try {
    $newPicturePath = upload_profile_picture(uploaded_picture());

    if ($newPicturePath !== null) {
        $picturePath = $newPicturePath;
    }
} catch (RuntimeException $error) {
    json_response([
        'success' => false,
        'message' => $error->getMessage(),
        'errors' => ['profile_picture' => $error->getMessage()],
    ], 422);
}

try {
    $updateStudent = db()->prepare(
        'UPDATE students
         SET name = ?, email = ?, phone = ?, address = ?, profile_picture = ?
         WHERE id = ?'
    );

    $updateStudent->execute([
        $student['name'],
        $student['email'],
        $student['phone'],
        $student['address'],
        $picturePath,
        $id,
    ]);
} catch (Throwable $error) {
    if ($newPicturePath !== null) {
        delete_profile_picture($newPicturePath);
    }

    throw $error;
}

if ($newPicturePath !== null) {
    delete_profile_picture($existingStudent['profile_picture']);
}

$findUpdatedStudent = db()->prepare('SELECT * FROM students WHERE id = ?');
$findUpdatedStudent->execute([$id]);
$updatedStudent = $findUpdatedStudent->fetch();

json_response([
    'success' => true,
    'message' => 'تم تحديث بيانات الطالب بنجاح.',
    'student' => format_student($updatedStudent),
]);
