<?php

$host = "127.0.0.1";
$dbname = "2023899646_db";
$username = "2023899646";
$password = "2023899646";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");

?>
