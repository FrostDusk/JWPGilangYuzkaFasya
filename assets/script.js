document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('input-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    
    const toggleEmptyState = () => {
    };

    // Save tasks to localStorage
    const saveTaskToLocal = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Load tasks from localStorage
    const loadLocalTask = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed }) => addTask(text, completed));
        toggleEmptyState();
    };

    const addTask = (text, completed = false) => {
        const taskText = text || taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
            <span>${taskText}</span>
            <div class="task-button">
                <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const deleteBtn = li.querySelector('.delete-button');

        // Apply completed state when loaded
        if (completed) {
            li.classList.add('completed');
        }

        // Toggle complete status
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            saveTaskToLocal();
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            saveTaskToLocal();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
        saveTaskToLocal();
    };

    addTaskBtn.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    loadLocalTask();
});