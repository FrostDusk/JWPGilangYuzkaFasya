<?php
require "db.php"; // exits if no DB

$id = $_POST['id'] ?? '';
$status = $_POST['status'] ?? '';

if ($id === '' || $status === '') {
    echo "Invalid task ID or status.";
    exit;
}

if ($conn->query("UPDATE tasks SET status = '$status' WHERE id = $id")) {
    echo "Task updated successfully.";
} else {
    echo "Error updating task: " . $conn->error;
}

$conn->close();
?>
