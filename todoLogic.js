let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
function addTask() {
  let taskInput = document.querySelector(".input-text");
  let taskDate = document.querySelector(".input-date");
  let task = taskInput.value.trim();
  let date = taskDate.value;
  if (task === "") {
    alert("Input is Empty");
    taskInput.value = "";
    return;
  }
  taskList.push({ taskValue: task, dateValue: date });
  // Save to localStorage
  localStorage.setItem("taskList", JSON.stringify(taskList));
  taskInput.value = "";
  taskDate.value = "";
  showListMain();
}
function showListMain() {
  let listcontainer = document.querySelector(".js-todo-list-main");
  listcontainer.innerHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    listcontainer.innerHTML += `<p class='task-list'>${taskList[i].taskValue} ${taskList[i].dateValue}
         <button class='delete-task' onclick="deleteTask(${i})">
           Delete
         </button></p>`;
  }
}
function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  showListMain();
}
showListMain();
