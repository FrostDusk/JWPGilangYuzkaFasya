<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "lspgyf";

$conn = @new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo "Database connection failed. Please check your DB setup.";
    exit;
}