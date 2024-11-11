let tasks = [];

// Función para agregar tarea
function addTask() {
    const description = document.getElementById('taskDescription').value;
    const date = document.getElementById('taskDate').value;

    if (description && date) {
        const task = {
            description: description,
            date: date,
            completed: false
        };

        // Agregar la tarea al array
        tasks.push(task);
        // Guardar las tareas en localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Limpiar los campos de entrada
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDate').value = '';
        // Volver a renderizar la lista
        renderTasks();
    } else {
        alert('Por favor complete todos los campos');
    }
}

// Función para renderizar las tareas
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    // Obtener tareas desde localStorage
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task.description} - ${task.date}
            <button onclick="completeTask(${index})">Completar</button>
            <button onclick="deleteTask(${index})">Eliminar</button>`;
        taskList.appendChild(li);
    });
}

// Función para completar una tarea
function completeTask(index) {
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Renderizar las tareas cuando se carga la página
window.onload = renderTasks;