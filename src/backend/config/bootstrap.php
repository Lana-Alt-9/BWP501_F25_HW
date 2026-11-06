<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/validation.php';
require_once __DIR__ . '/../includes/uploads.php';

ini_set('display_errors', '0');

function handle_uncaught_error(Throwable $error): void
{
    error_log((string) $error);

    json_response([
        'success' => false,
        'message' => 'حدث خطأ في الخادم.',
    ], 500);
}

header('Content-Type: application/json; charset=utf-8');
send_cors_headers();

$isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => $isHttps,
]);

session_start();

set_exception_handler('handle_uncaught_error');
