const addTaskBtn = document.querySelector("#add-task-btn");
const inputDescription = document.querySelector("#task-description");
const todosWrapper = document.querySelector(".todos-wrapper");

let tasks = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

function createTask(task, index) {
    let newTask = document.createElement("div");
    newTask.classList.add("task");

    let description = document.createElement("div");
    description.classList.add("description");
    description.textContent = task.description;

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("complete-btn");

    let deleteBin = document.createElement("i");
    deleteBin.classList.add("delete-btn");
    deleteBin.classList.add("fa-solid");
    deleteBin.classList.add("fa-trash");

    buttons.append(input, deleteBin);
    newTask.append(description, buttons);

    return newTask;
}

function addTask() {
    todosWrapper.innerHTML = "";

    if (tasks.length > 0) {
        tasks.forEach((task, index) => {
            todosWrapper.append(createTask(task, index));
        });
    }
}

addTaskBtn.addEventListener("click", () => {
    if (inputDescription.value) {
        tasks.push(new Task(inputDescription.value));
        addTask();
        inputDescription.value = "";
    }
});



