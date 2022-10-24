const addTaskBtn = document.querySelector("#add-task-btn");
const inputDescription = document.querySelector("#task-description");
const todosWrapper = document.querySelector(".todos-wrapper");

let tasksInfo = [];
let counter = 0;

class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
        this.div = null;
    }

    createTask(index) {
        this.div = document.createElement("div");
        this.div.classList.add("task");

        let description = document.createElement("div");
        description.classList.add("description");
        description.textContent = this.description;

        let buttons = document.createElement("span");
        buttons.classList.add("buttons");

        let check = document.createElement("i");
        check.classList.add("fa-regular");
        check.classList.add("fa-circle");
        check.classList.add("check-btn");
        let span1 = document.createElement("span");
        span1.append(check);
        if (this.completed) {
            this.div.classList.add("completed");

            check.classList.remove("fa-regular");
            check.classList.remove("fa-circle");

            check.classList.add("fa-solid");
            check.classList.add("fa-circle-check");
        }

        check.addEventListener("click", () => this.changeState(this.div));

        let deleteTask = document.createElement("i");
        deleteTask.classList.add("delete-btn");
        deleteTask.classList.add("fa-solid");
        deleteTask.classList.add("fa-trash");
        deleteTask.addEventListener("click", () => {
            tasksInfo.splice(index, 1);
            render();
        });
        let span2 = document.createElement("span");
        span2.append(deleteTask);

        buttons.append(span1, span2);
        this.div.append(description, buttons);

        return todosWrapper.append(this.div);
    }

    changeState(element) {
        this.completed = !this.completed;
        if (this.completed) {
            element.classList.add("completed");
            element.classList.remove("fa-regular");
            element.classList.remove("fa-circle");

            element.classList.add("fa-solid");
            element.classList.add("fa-circle-check");
        } else {
            element.classList.add("fa-regular");
            element.classList.add("fa-circle");

            element.classList.remove("fa-solid");
            element.classList.remove("fa-circle-check");

            element.classList.remove("completed");
        }
        render();
    }
}

function render() {
    const counterOutput = document.querySelector("#counter-output");
    const counterText = document.querySelector("#counter-text");

    todosWrapper.innerHTML = "";

    if (tasksInfo.length === 0) {
        counterOutput.textContent = "0";
        counterText.textContent = "Tasks remaining";
    }
    if (tasksInfo.length > 0) {
        tasksInfo.forEach((task, index) => {
            task.createTask(index);
        });

        counter = tasksInfo.length;
        counterOutput.textContent = `${counter}`;
        counterText.textContent = "Tasks remaining";
        tasksInfo.forEach(task => {
            if (task.completed) {
                counter = counter - 1;
                counterOutput.textContent = `${counter}`;
                counterText.textContent = "Tasks remaining";
            }
        });
    }
    if (counter === 1) {
        counterText.textContent = "Task remaining";
    }
}

function addTaskHandler() {
    if (inputDescription.value) {
        tasksInfo.push(new Task(inputDescription.value));
        render();
        inputDescription.value = "";
    }
}

addTaskBtn.addEventListener("click", addTaskHandler);
inputDescription.addEventListener("keydown", (e) => {
    if (e.code === "Enter") addTaskHandler();
});

let filter = document.querySelector(".filter-bar");
filter.addEventListener("click", (e) => {
    let tasks;

    switch (e.target.textContent) {
        case "All":
            render();
            break;

        case "Active":
            render();

            tasks = document.querySelectorAll(".completed");
            tasks.forEach(task => {
                task.classList.add("hidden");
            });
            break;

        case "Done":
            render();

            tasks = document.querySelectorAll(".task");
            tasks.forEach(task => {
                task.classList.add("hidden");
                if (task.classList.contains("completed")) {
                    task.classList.remove("hidden");
                }
            });
            break;
    }
});