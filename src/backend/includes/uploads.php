<?php

function uploaded_picture(): array
{
    if (isset($_FILES['profile_picture'])) {
        return $_FILES['profile_picture'];
    }

    if (isset($_FILES['profilePicture'])) {
        return $_FILES['profilePicture'];
    }

    return [];
}

function upload_profile_picture(array $file): ?string
{
    $uploadError = UPLOAD_ERR_NO_FILE;

    if (isset($file['error'])) {
        $uploadError = $file['error'];
    }

    if ($uploadError === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if ($uploadError !== UPLOAD_ERR_OK) {
        throw new RuntimeException('تعذر رفع الصورة الشخصية.');
    }

    $fileSize = 0;

    if (isset($file['size'])) {
        $fileSize = $file['size'];
    }

    if ($fileSize > MAX_PICTURE_BYTES) {
        throw new RuntimeException('يجب ألا يتجاوز حجم الصورة الشخصية 2 ميغابايت.');
    }

    $fileInfo = new finfo(FILEINFO_MIME_TYPE);
    $detectedType = $fileInfo->file($file['tmp_name']);
    $allowedTypes = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ];

    if (!isset($allowedTypes[$detectedType])) {
        throw new RuntimeException('يُسمح بالصور بصيغ JPG وPNG وWebP فقط.');
    }

    if (!is_dir(UPLOAD_DIR) && !mkdir(UPLOAD_DIR, 0775, true)) {
        throw new RuntimeException('تعذر إنشاء مجلد رفع الملفات.');
    }

    $newFilename = bin2hex(random_bytes(16)) . '.' . $allowedTypes[$detectedType];
    $newFilePath = UPLOAD_DIR . '/' . $newFilename;

    if (!move_uploaded_file($file['tmp_name'], $newFilePath)) {
        throw new RuntimeException('تعذر حفظ الصورة الشخصية.');
    }

    return UPLOAD_URL . '/' . $newFilename;
}

function delete_profile_picture(?string $path): void
{
    if ($path === null || !str_starts_with($path, UPLOAD_URL . '/')) {
        return;
    }

    $filePath = UPLOAD_DIR . '/' . basename($path);

    if (is_file($filePath)) {
        unlink($filePath);
    }
}
