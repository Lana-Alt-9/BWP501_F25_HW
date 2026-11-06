<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('POST');

$data = request_data();
$errors = validate_registration($data);

if ($errors !== []) {
    json_response([
        'success' => false,
        'message' => 'يرجى تصحيح الأخطاء أدناه.',
        'errors' => $errors,
    ], 422);
}

    $firstName = text_input($data, 'firstName') ;
    $lastName = text_input($data, 'lastName') ;
    $username = trim($firstName ." ". $lastName);
    $email = strtolower(text_input($data, 'email'));
    $password = raw_input($data, 'password');
    $confirmation = raw_input($data, 'confirmPassword');

$findExistingUsers = db()->prepare('SELECT username, email FROM users WHERE username = ? OR email = ?');
$findExistingUsers->execute([$username, $email]);

foreach ($findExistingUsers->fetchAll() as $existingUser) {
   
    if (strtolower($existingUser['email']) === strtolower($email)) {
        $errors['email'] = 'هذا البريد الإلكتروني مسجل بالفعل.';
    }
}

if ($errors !== []) {
    json_response([
        'success' => false,
        'message' => 'يرجى تصحيح الأخطاء أدناه.',
        'errors' => $errors,
    ], 409);
}

try {
    $createUser = db()->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    $createUser->execute([
        $username,
        $email,
        password_hash($password, PASSWORD_DEFAULT),
    ]);
} catch (PDOException $error) {
    if ($error->getCode() === '23000') {
        json_response([
            'success' => false,
            'message' => 'اسم المستخدم أو البريد الإلكتروني مسجل بالفعل.',
        ], 409);
    }

    throw $error;
}

$newUserId = (int) db()->lastInsertId();

json_response([
    'success' => true,
    'message' => 'تم إنشاء الحساب. يمكنك تسجيل الدخول الآن.',
    'user' => [
        'id' => $newUserId,
        'username' => $username,
        'email' => $email,
    ],
], 201);
