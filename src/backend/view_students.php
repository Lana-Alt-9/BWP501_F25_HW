<?php

require_once __DIR__ . '/config/bootstrap.php';

require_method('GET');
require_login();

if (query_text('id') !== '') {
    $findStudent = db()->prepare('SELECT * FROM students WHERE id = ?');
    $findStudent->execute([(int) query_text('id')]);
    $student = $findStudent->fetch();

    if (!$student) {
        json_response([
            'success' => false,
            'message' => 'الطالب غير موجود.',
        ], 404);
    }

    json_response([
        'success' => true,
        'student' => format_student($student),
    ]);
}

$search = query_text('search');
$page = max(1, (int) query_text('page'));

$sortColumns = [
    
    'name' => 'name',
    'email' => 'email',
    'phone' => 'phone',
    'created_at' => 'created_at',
];

$sortKey = query_text('sort');
$sortColumn = 'created_at';

if (isset($sortColumns[$sortKey])) {
    $sortColumn = $sortColumns[$sortKey];
}

$sortDirection = 'DESC';

if (strtolower(query_text('direction')) === 'asc') {
    $sortDirection = 'ASC';
}

$searchCondition = '';
$searchParameters = [];

if ($search !== '') {
    $searchCondition = ' WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?';
    $searchTerm = '%' . $search . '%';
    $searchParameters = [$searchTerm, $searchTerm, $searchTerm];
}

$countStudents = db()->prepare('SELECT COUNT(*) FROM students' . $searchCondition);
$countStudents->execute($searchParameters);
$total = (int) $countStudents->fetchColumn();

$totalPages = max(1, (int) ceil($total / STUDENTS_PER_PAGE));
$page = min($page, $totalPages);
$offset = ($page - 1) * STUDENTS_PER_PAGE;

$sql = 'SELECT * FROM students' . $searchCondition
    . ' ORDER BY ' . $sortColumn . ' ' . $sortDirection
    . ' LIMIT ' . STUDENTS_PER_PAGE
    . ' OFFSET ' . $offset;

$findStudents = db()->prepare($sql);
$findStudents->execute($searchParameters);

$students = [];

foreach ($findStudents->fetchAll() as $student) {
    $students[] = format_student($student);
}

json_response([
    'success' => true,
    'students' => $students,
    'pagination' => [
        'page' => $page,
        'per_page' => STUDENTS_PER_PAGE,
        'total' => $total,
        'total_pages' => $totalPages,
        'has_previous' => $page > 1,
        'has_next' => $page < $totalPages,
    ],
]);
