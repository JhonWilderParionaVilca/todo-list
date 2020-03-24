"use strict";
/*------------------------------/*
      $FUNCTIONS
/*------------------------------*/
function existDB() {
  if (localStorage.getItem("tasks") !== null) {
    return true;
  } else {
    return false;
  }
}

function isEmpty() {
  let taskDB = JSON.parse(localStorage.getItem("tasks"));
  if (taskDB.length === 0) {
    return true;
  }
  return false;
}
function existTask(name) {
  let taskDB = JSON.parse(localStorage.getItem("tasks"));
  let exist = false;
  for (let index = 0; index < taskDB.length; index++) {
    const element = taskDB[index];
    if (element.name === name) {
      exist = true;
    }
  }
  return exist;
}

/*------------------------------/*
      $CLASS TASK
/*------------------------------*/

class Task {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

/*------------------------------/*
      $CLASS UI
/*------------------------------*/

class UI {
  // add task to localStorage
  addTask(newTask, taskDB) {
    taskDB.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskDB));
  }
  // reset for,
  resetform() {
    document.getElementById("task-form").reset();
  }
  // add task in list
  showTask(taskObject, listProducts) {
    const element = document.createElement("tr");
    element.className = `table-light`;
    element.innerHTML = `
    <th scope="row">${taskObject.name}</th>
    <td>${taskObject.description}</td>
    <td>
    <button type="button" class="btn btn-danger" name="delete" onClick="deleteTask('${taskObject.name}')"><span class="fas fa-trash-alt"></span> Eliminar</button>
    </td>
    `;

    listProducts.appendChild(element);
  }
}
/*------------------------------/*
    $ONLOAD PAGE
/*------------------------------*/
function cargar() {
  const listProducts = document.getElementById("list-products");

  if (!existDB() || isEmpty()) {
    return (listProducts.innerHTML = `<h3 class ="text-center"> No hay tareas </h3>`);
  }
  const taskSaved = JSON.parse(localStorage.getItem("tasks"));
  listProducts.innerHTML = "";
  const ui = new UI();
  for (let index = 0; index < taskSaved.length; index++) {
    const element = taskSaved[index];
    ui.showTask(element, listProducts);
  }
}
/*------------------------------/*
    $ADD TASK
/*------------------------------*/
document.getElementById("task-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const description = document.getElementById("task-description").value;
  const name = document.getElementById("task-name").value;
  const listProducts = document.getElementById("list-products");

  const newTask = new Task(name, description);
  const newUi = new UI();

  if (!existDB()) {
    let taskDB = [];
    console.log("no existe db", taskDB);
    newUi.addTask(newTask, taskDB);
    newUi.resetform();
    listProducts.innerHTML = "";
    newUi.showTask(newTask, listProducts);
    return;
  }

  let taskDB = JSON.parse(localStorage.getItem("tasks"));

  // comprobando que no exista la tarea
  if (taskDB.length !== 0 && existTask(name)) {
    console.log("la tarea existe");
    return alert("usuario ya existe");
  }
  console.log("la tarea no existe");

  newUi.addTask(newTask, taskDB);
  newUi.resetform();

  listProducts.innerHTML = "";
  for (let index = 0; index < taskDB.length; index++) {
    const element = taskDB[index];
    newUi.showTask(element, listProducts);
  }
});

/*------------------------------/*
    $DELETE TASK
/*------------------------------*/
function deleteTask(nameTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let index = 0; index < tasks.length; index++) {
    const element = tasks[index];
    if (element.name === nameTask) {
      tasks.splice(index, 1);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // const taskSaved = JSON.parse(localStorage.getItem("tasks"));
  const listProducts = document.getElementById("list-products");
  listProducts.innerHTML = "";
  const ui = new UI();
  for (let index = 0; index < tasks.length; index++) {
    const element = tasks[index];
    ui.showTask(element, listProducts);
  }
  if (!existDB() || isEmpty()) {
    return (listProducts.innerHTML = `<h3 class ="text-center"> No hay tareas </h3>`);
  }
}
