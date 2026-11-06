<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('POST');
require_login();

$data = request_data();
$errors = validate_student($data);

json_response([
    'success' => true,
    'valid' => $errors === [],
    'errors' => $errors,
]);
