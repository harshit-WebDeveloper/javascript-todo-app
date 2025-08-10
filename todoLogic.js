const taskList = Array();
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
  taskInput.value = "";
  taskDate.value = "";
  showListMain();
}
function showListMain() {
  let listcontainer = document.querySelector(".js-todo-list-main");
  listcontainer.innerHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    listcontainer.innerHTML += `<p class='task-list'>${taskList[i].taskValue} ${taskList[i].dateValue}
         <button class='delete-task' onclick="taskList.splice(${i}, 1); showListMain();">
           Delete
         </button></p>`;
  }
}
