<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('POST');

$data = request_data();
$errors = validate_login($data);

if ($errors !== []) {
    json_response([
        'success' => false,
        'message' => 'يرجى تصحيح الأخطاء أدناه.',
        'errors' => $errors,
    ], 422);
}

$identifier = login_identifier($data);
$password = raw_input($data, 'password');

$findUser = db()->prepare(
    'SELECT id, username, email, password FROM users WHERE username = ? OR email = ? LIMIT 1'
);
$findUser->execute([$identifier, $identifier]);
$user = $findUser->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    json_response([
        'success' => false,
        'message' => 'اسم المستخدم أو البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    ], 401);
}

log_user_in($user);

json_response([
    'success' => true,
    'message' => 'تم تسجيل الدخول بنجاح.',
    'user' => current_user(),
]);
