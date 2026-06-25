<?php
session_start();
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: register.html");
    exit();
}

$fullname = trim($_POST['fullname']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];

if (
    empty($fullname) ||
    empty($email) ||
    empty($phone) ||
    empty($password) ||
    empty($confirmPassword)
) {
    die("Please fill in all fields.");
}

if ($password !== $confirmPassword) {
    die("Passwords do not match.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address.");
}

/* Check email already exists */
$stmt = $conn->prepare("SELECT id FROM lhdn_users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    die("Email already registered.");
}

$stmt->close();

/* Generate username from email */
$baseUsername = strstr($email, "@", true);
$username = $baseUsername;
$count = 1;

while (true) {

    $check = $conn->prepare("SELECT id FROM lhdn_users WHERE username = ?");
    $check->bind_param("s", $username);
    $check->execute();
    $check->store_result();

    if ($check->num_rows == 0) {
        $check->close();
        break;
    }

    $check->close();
    $username = $baseUsername . $count;
    $count++;
}

/* Encrypt password */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

/* Save user */

$stmt = $conn->prepare("
INSERT INTO lhdn_users
(fullname, username, email, password, phone)
VALUES
(?,?,?,?,?)
");

$stmt->bind_param(
    "sssss",
    $fullname,
    $username,
    $email,
    $hashedPassword,
    $phone
);

if ($stmt->execute()) {

    echo "
    <script>
        alert('Account created successfully!');
        window.location='login.html';
    </script>
    ";

} else {

    echo "
    <script>
        alert('Registration failed.');
        history.back();
    </script>
    ";

}

$stmt->close();
$conn->close();
?>
