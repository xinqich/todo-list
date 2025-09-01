"use strict";

export function addTask(
    params = {
        id: 0,
        title: "",
        completed: false,
    },
) {
    const taskList = document.querySelector("#taskList");
    const lastTaskId = taskList.lastElementChild
        ? Number(taskList.lastElementChild.id)
        : 1;
    const task = document.createElement("div");

    const title = params.title || "";
    const completed = params.completed || false;

    task.className = "task";
    // if no id provided in params, use last task's id + 1
    task.id = params.id || String(lastTaskId + 1);

    task.innerHTML = `
        <div class="left-side">
            <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
            <div class="task-title ${completed ? "completed" : ""}">${title}</div> 
        </div>
        <div class="right-side">
            <span class="notification"></span>
            <button class="main-btn delete-btn">Удалить</button>
        </div>
    `;

    task.addEventListener("click", function (event) {
        switch (event.target.tagName) {
            case "INPUT":
                task.children[0].children[1].classList.toggle('completed')
                break;

            case "BUTTON":
                taskList.removeChild(this);
                break;
        }
        saveTasks();
    });

    taskList.appendChild(task);
    saveTasks();
}

export function saveTasks() {
    const taskList = document.querySelector("#taskList");
    let payload = [];
    for (let task of taskList.children) {
        const completed = task.children[0].children[0].checked;
        const title = task.children[0].children[1].textContent;
        payload.push({
            id: task.id,
            title: title,
            completed: completed,
        });
    }
    localStorage.setItem("tasks", JSON.stringify(payload));
}

export function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks || tasks.length === 0) {
        return false;
    }

    tasks.forEach((task) => {
        addTask({
            id: task.id,
            title: task.title,
            completed: task.completed,
        });
    });
    return true;
}

export function loadPlaceholderTasks() {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((r) => r.json())
        .then((json) => {
            json.forEach((task) => {
                addTask({
                    id: task.id,
                    title: task.title,
                    completed: task.completed,
                });
            });
        });
}

export function sortTasks() {}
