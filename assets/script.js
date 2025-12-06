document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('input-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    const showError = (msg) => alert(msg); // simple error alert

    // Load tasks from DB
    fetch("./api/get.php")
        .then(res => res.text())
        .then(data => {
            if (data.startsWith("Error") || data.startsWith("Database")) {
                showError(data);
                return;
            }
            taskList.innerHTML = data;

            // Attach event listeners to checkboxes and delete buttons
            taskList.querySelectorAll('li').forEach(li => {
                const checkbox = li.querySelector('.checkbox');
                const deleteBtn = li.querySelector('.delete-button');
                const id = li.dataset.id;

                checkbox.addEventListener('change', () => {
                    const form = new FormData();
                    form.append('id', id);
                    form.append('status', checkbox.checked ? 1 : 0);
                    fetch('./api/update.php', { method: 'POST', body: form })
                        .then(res => res.text())
                        .then(msg => { if (msg.startsWith("Error")) showError(msg); });
                });

                deleteBtn.addEventListener('click', () => {
                    const form = new FormData();
                    form.append('id', id);
                    fetch('./api/delete.php', { method: 'POST', body: form })
                        .then(res => res.text())
                        .then(msg => {
                            if (msg.startsWith("Error")) {
                                showError(msg);
                            } else {
                                li.remove();
                            }
                        });
                });
            });
        })
        .catch(err => showError("Cannot connect to backend."));
    
    // Add new task
    const addTask = () => {
        const title = taskInput.value.trim();
        if (!title) return;

        const form = new FormData();
        form.append('title', title);

        fetch('./api/save.php', { method: 'POST', body: form })
            .then(res => res.text())
            .then(msg => {
                if (msg.startsWith("Error")) {
                    showError(msg);
                } else {
                    location.reload(); // reload to fetch updated tasks
                }
            });
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });
});
