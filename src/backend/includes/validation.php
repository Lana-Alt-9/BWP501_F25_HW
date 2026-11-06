<?php

function login_identifier(array $data): string
{
    $login = text_input($data, 'login');

    if ($login !== '') {
        return $login;
    }

    $email = text_input($data, 'email');

    if ($email !== '') {
        return $email;
    }

    return text_input($data, 'username');
}

function validate_registration(array $data): array
{
    $firstName = text_input($data, 'firstName') ;
    $lastName = text_input($data, 'lastName') ;
    $username = trim($firstName ." ". $lastName);
    $email = strtolower(text_input($data, 'email'));
    $password = raw_input($data, 'password');
    $confirmation = raw_input($data, 'confirmPassword');



    $errors = [];

    if (mb_strlen($username)<3 || mb_strlen($username)> 100) {
        $errors['firstName'] = 'يجب أن يتراوح الاسم بين 3 و100 حرف.';
    }

    $emailIsValid = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    $emailIsTooLong = strlen($email) > 100;

    if (!$emailIsValid || $emailIsTooLong) {
        $errors['email'] = 'أدخل عنوان بريد إلكتروني صالحاً.';
    }

    if (strlen($password) < 8) {
        $errors['password'] = 'يجب ألا تقل كلمة المرور عن 8 أحرف.';
    }

    if ($password !== $confirmation) {
        $errors['confirmPassword'] = 'كلمتا المرور غير متطابقتين.';
    }

    return $errors;
}

function validate_login(array $data): array
{
    $errors = [];

    if (login_identifier($data) === '') {
        $errors['login'] = 'أدخل اسم المستخدم أو البريد الإلكتروني.';
    }

    if (raw_input($data, 'password') === '') {
        $errors['password'] = 'أدخل كلمة المرور.';
    }

    return $errors;
}

function student_name(array $data): string
{
    $firstName = text_input($data, 'firstName');
    $lastName = text_input($data, 'lastName');
    $name = trim($firstName ." ". $lastName);
    if ($name !== '') {
        return $name;
    }

    return text_input($data, 'fullName');
}

function student_input(array $data): array
{
    return [
        'name' => student_name($data),
        'email' => strtolower(text_input($data, 'email')),
        'phone' => text_input($data, 'phone'),
        'address' => text_input($data, 'address'),
    ];
}

function validate_student(array $data): array
{
    $student = student_input($data);
    $errors = [];

    $nameLength = mb_strlen($student['name']);

    if ($nameLength < 2 || $nameLength > 100) {
        $errors['name'] = 'يجب أن يتراوح الاسم بين حرفين و100 حرف.';
    }

    $emailIsValid = filter_var($student['email'], FILTER_VALIDATE_EMAIL) !== false;
    $emailIsTooLong = strlen($student['email']) > 100;

    if (!$emailIsValid || $emailIsTooLong) {
        $errors['email'] = 'أدخل عنوان بريد إلكتروني صالحاً.';
    }

    $phoneDigits = (string) preg_replace('/\D/', '', $student['phone']);
    $phoneIsTooShort = strlen($phoneDigits) < 7;
    $phoneIsTooLong = strlen($phoneDigits) > 15 || strlen($student['phone']) > 15;

    if ($phoneIsTooShort || $phoneIsTooLong) {
        $errors['phone'] = 'يجب أن يتكون رقم الهاتف من 7 إلى 15 رقماً.';
    }

    $addressLength = mb_strlen($student['address']);

    if ($addressLength < 5 || $addressLength > 500) {
        $errors['address'] = 'يجب أن يتراوح العنوان بين 5 و500 حرف.';
    }

    return $errors;
}
