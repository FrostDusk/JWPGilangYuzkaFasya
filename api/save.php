<?php
require "db.php"; // exits if no DB

$title = $_POST['title'] ?? '';

if (!$title) {
    echo "Task title cannot be empty.";
    exit;
}

if ($conn->query("INSERT INTO tasks (title) VALUES ('$title')")) {
    echo "Task saved successfully.";
} else {
    echo "Error saving task: " . $conn->error;
}

$conn->close();
?>
