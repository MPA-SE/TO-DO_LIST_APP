document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
});

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    fetch("http://localhost:3000/tasks")
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(function (task, index) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${task}</span>
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();

    if (task !== "") {
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task }),
        })
        .then(response => response.json())
        .then(() => {
            taskInput.value = "";
            displayTasks();
        });
    }
}

function deleteTask(index) {
    fetch(`http://localhost:3000/tasks/${index}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(() => displayTasks());
}