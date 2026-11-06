<?php

function current_user(): ?array
{
    if (isset($_SESSION['user'])) {
        return $_SESSION['user'];
    }

    return null;
}

function require_login(): void
{
    if (current_user() === null) {
        json_response([
            'success' => false,
            'message' => 'يرجى تسجيل الدخول أولاً.',
        ], 401);
    }
}

function log_user_in(array $user): void
{
    session_regenerate_id(true);

    $_SESSION['user'] = [
        'id' => (int) $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
    ];
}

function log_user_out(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $cookieSettings = session_get_cookie_params();

        setcookie(
            session_name(),
            '',
            time() - 42000,
            $cookieSettings['path'],
            $cookieSettings['domain'],
            $cookieSettings['secure'],
            $cookieSettings['httponly']
        );
    }

    session_destroy();
}
