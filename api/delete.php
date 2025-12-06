<?php
require "db.php"; // exits if no DB

$id = $_POST['id'] ?? '';

if (!$id) {
    echo "Invalid task ID.";
    exit;
}

if ($conn->query("DELETE FROM tasks WHERE id = $id")) {
    echo "Task deleted successfully.";
} else {
    echo "Error deleting task: " . $conn->error;
}

$conn->close();
?>
