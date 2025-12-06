<?php
require "db.php"; // exits if no DB

$result = $conn->query("SELECT * FROM tasks ORDER BY id DESC");

if (!$result) {
    echo "Error fetching tasks: " . $conn->error;
    exit;
}

// Output each task as a list item
while ($row = $result->fetch_assoc()) {
    $checked = $row['status'] ? 'checked' : '';
    echo '<li data-id="' . $row['id'] . '">
            <input type="checkbox" class="checkbox" ' . $checked . ' />
            <span>' . htmlspecialchars($row['title']) . '</span>
            <div class="task-button">
                <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
            </div>
          </li>';
}

$conn->close();
?>
