// noinspection JSCheckFunctionSignatures

import {
    saveTasks,
    loadTasks,
    loadPlaceholderTasks,
    addTask,
    sortTasks,
} from "./funcs.js";

const ok = loadTasks()
if (!ok) {
    loadPlaceholderTasks()
    saveTasks()
}

let taskForm = document.querySelector("#taskForm");
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask({
        title: taskForm.children[0].value
    });
    taskForm.reset();
});

const sortButtons = document.querySelectorAll('.sort-btn')
document.querySelector('.sort-tasks').addEventListener('click', (event) => {
    sortTasks(event.target.id)
})