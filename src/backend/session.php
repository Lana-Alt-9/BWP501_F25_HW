<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('GET');

$user = current_user();

json_response([
    'success' => true,
    'authenticated' => $user !== null,
    'user' => $user,
]);
