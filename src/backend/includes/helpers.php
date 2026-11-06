<?php

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);

    echo json_encode($payload);

    exit;
}

function request_method(): string
{
    if (isset($_SERVER['REQUEST_METHOD'])) {
        return strtoupper($_SERVER['REQUEST_METHOD']);
    }

    return 'GET';
}

function require_method(string $method): void
{
    if (request_method() !== strtoupper($method)) {
        header('Allow: ' . strtoupper($method));
        json_response([
            'success' => false,
            'message' => 'طريقة الطلب غير مسموح بها.',
        ], 405);
    }
}

function request_data(): array
{
    $contentType = '';

    if (isset($_SERVER['CONTENT_TYPE'])) {
        $contentType = $_SERVER['CONTENT_TYPE'];
    }

    if (str_contains($contentType, 'application/json')) {
        $rawBody = file_get_contents('php://input');
        $decoded = json_decode($rawBody, true);

        if (is_array($decoded)) {
            return $decoded;
        }

        return [];
    }

    return $_POST;
}

function text_input(array $data, string $key): string
{
    if (!isset($data[$key]) || !is_string($data[$key])) {
        return '';
    }

    return trim($data[$key]);
}

function raw_input(array $data, string $key): string
{
    if (!isset($data[$key]) || !is_string($data[$key])) {
        return '';
    }

    return $data[$key];
}

function int_input(array $data, string $key): int
{
    if (!isset($data[$key])) {
        return 0;
    }

    return (int) $data[$key];
}

function query_text(string $key): string
{
    if (!isset($_GET[$key]) || !is_string($_GET[$key])) {
        return '';
    }

    return trim($_GET[$key]);
}

function send_cors_headers(): void
{
    $origin = '';

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        $origin = $_SERVER['HTTP_ORIGIN'];
    }

    $originIsAllowed = in_array($origin, ALLOWED_ORIGINS, true);

    if ($originIsAllowed) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

    if (request_method() === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function base_url(): string
{
    $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    $scheme = 'http';

    if ($isHttps) {
        $scheme = 'https';
    }

    $host = 'localhost';

    if (isset($_SERVER['HTTP_HOST'])) {
        $host = $_SERVER['HTTP_HOST'];
    }

    $scriptName = '/';

    if (isset($_SERVER['SCRIPT_NAME'])) {
        $scriptName = $_SERVER['SCRIPT_NAME'];
    }

    $directory = str_replace('\\', '/', dirname($scriptName));
    $directory = rtrim($directory, '/');

    if ($directory === '.') {
        $directory = '';
    }

    return $scheme . '://' . $host . $directory;
}

function format_student(array $student): array
{
    $pictureUrl = null;

    if ($student['profile_picture']) {
        $pictureUrl = base_url() . '/' . $student['profile_picture'];
    }

    return [
        'id' => (int) $student['id'],
        'name' => $student['name'],
        'email' => $student['email'],
        'phone' => $student['phone'],
        'address' => $student['address'],
        'profile_picture' => $pictureUrl,
        'created_at' => $student['created_at'],
    ];
}
