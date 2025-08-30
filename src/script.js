loadPlaceholderTasks()

let taskForm = document.querySelector("#taskForm");
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(taskForm.children[0].value);
    taskForm.reset();
});

function addTask(
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
            <div class="task-title">${title}</div> 
        </div>
        <div class="right-side">
            <span class="notification"></span>
            <button class="main-btn delete-btn">Удалить</button>
        </div>
    `;

    task.addEventListener("click", (event) => {
        switch (event.target.tagName) {
            case "INPUT":
                console.log("checked task");
                break;

            case "BUTTON":
                console.log("task deleted");
                break;
        }
    });

    taskList.appendChild(task);
}

function saveTasks() {
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

function loadPlaceholderTasks() {
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
