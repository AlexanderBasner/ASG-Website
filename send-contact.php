<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function getPostString(string $key): string
{
    $value = $_POST[$key] ?? '';

    return is_string($value) ? trim($value) : '';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['success' => false, 'error' => 'method_not_allowed']);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 25000) {
    respond(413, ['success' => false, 'error' => 'request_too_large']);
}

$name = getPostString('name');
$email = getPostString('email');
$subject = getPostString('subject');
$message = getPostString('message');
$website = getPostString('website');

if ($website !== '') {
    respond(400, ['success' => false, 'error' => 'invalid_input']);
}

if (
    $name === '' ||
    strlen($name) > 500 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($email) > 254 ||
    $subject === '' ||
    strlen($subject) > 800 ||
    $message === '' ||
    strlen($message) > 20000
) {
    respond(400, ['success' => false, 'error' => 'invalid_input']);
}

if (!function_exists('mail')) {
    error_log('Contact form could not send mail: PHP mail() is unavailable.');
    respond(503, ['success' => false, 'error' => 'mail_unavailable']);
}

$recipient = 'info@asgsicherheit.de';
$mailSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$mailBody =
    "Neue Kontaktanfrage über die Website\n\n" .
    "Name: {$name}\n" .
    "E-Mail: {$email}\n\n" .
    "Nachricht:\n{$message}\n";
$headers = [
    'From: ASG Sicherheit & Service <info@asgsicherheit.de>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

if (!mail($recipient, $mailSubject, $mailBody, implode("\r\n", $headers))) {
    error_log('Contact form mail() call failed.');
    respond(502, ['success' => false, 'error' => 'send_failed']);
}

respond(200, ['success' => true]);
