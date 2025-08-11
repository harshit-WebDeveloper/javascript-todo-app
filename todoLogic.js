document.querySelector(".add-task").addEventListener("click", () => {
  addTask();
});
document.querySelector(".delete-all-task").addEventListener("click", () => {
  deleteAllTask();
});

// Prevent selecting past dates
document.querySelector(".input-date").min = new Date()
  .toISOString()
  .split("T")[0];

let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function addTask() {
  let taskInput = document.querySelector(".input-text");
  let taskDate = document.querySelector(".input-date");
  let taskError = document.querySelector(".task-error");
  let dateError = document.querySelector(".date-error");

  let task = taskInput.value.trim();
  let date = taskDate.value;

  // Clear previous errors
  taskError.textContent = "";
  dateError.textContent = "";

  let hasError = false;

  // Check if task is empty
  if (!task) {
    taskError.textContent = "Please enter a task.";
    hasError = true;
  }

  // Check if date is empty
  if (!date) {
    dateError.textContent = "Please select a date.";
    hasError = true;
  }

  // Check if date is in the past
  let today = new Date().toISOString().split("T")[0];
  if (date && date < today) {
    dateError.textContent = "Date cannot be in the past.";
    hasError = true;
  }

  if (hasError) return;

  // Add task
  taskList.push({ taskValue: task, dateValue: date });

  // Save to localStorage
  localStorage.setItem("taskList", JSON.stringify(taskList));

  // Clear inputs
  taskInput.value = "";
  taskDate.value = "";

  showListMain();
}

function showListMain() {
  let listcontainer = document.querySelector(".js-todo-list-main");
  listcontainer.innerHTML = "";

  taskList.forEach((task, index) => {
    listcontainer.innerHTML += `
      <div class='task-row'>
        <span>${task.taskValue}</span>
        <span>${task.dateValue}</span>
        <button class='delete-task' onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  showListMain();
}

function deleteAllTask() {
  taskList = [];
  localStorage.removeItem("taskList");
  showListMain();
}

showListMain();
