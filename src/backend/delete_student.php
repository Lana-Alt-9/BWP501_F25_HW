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

$findStudent = db()->prepare('SELECT profile_picture FROM students WHERE id = ?');
$findStudent->execute([$id]);
$studentRecord = $findStudent->fetch();

if (!$studentRecord) {
    json_response([
        'success' => false,
        'message' => 'الطالب غير موجود.',
    ], 404);
}

$deleteStudent = db()->prepare('DELETE FROM students WHERE id = ?');
$deleteStudent->execute([$id]);

delete_profile_picture($studentRecord['profile_picture']);

json_response([
    'success' => true,
    'message' => 'تم حذف الطالب بنجاح.',
]);
