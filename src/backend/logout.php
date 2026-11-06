<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('POST');

log_user_out();

json_response([
    'success' => true,
    'message' => 'تم تسجيل الخروج بنجاح.',
]);
