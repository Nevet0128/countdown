const $toDoContainer = d.getElementById("toDo-container"),
  $toDoTemplate = d.getElementById("toDo-template").content, //template to make tasks
  $newTask = d.getElementById("new-task"), //input:text for new task
  $addTask = d.getElementById("add-task"), //button for ass task
  $pendingTask = d.getElementById("pending-task"), //container
  $taskCompleted = d.getElementById("task-completed"), //container
  $tasks = d.querySelectorAll(".task"); //task container

function addTask() {
  let current_tasks = d.getElementById("pending-task").children.length;

  $toDoTemplate
    .querySelector("label")
    .setAttribute("for", `task${current_tasks + 1}`);
  $toDoTemplate.querySelector("span").textContent = $newTask.value;
  $toDoTemplate.querySelector("input").checked = false;
  $toDoTemplate.querySelector("input").id = `task${current_tasks + 1}`;

  let $clone = d.importNode($toDoTemplate, true);
  $pendingTask.appendChild($clone);
}

function cambiarEstadoTarea(text, element, isCompleted) {
  if (isCompleted) {
    let current_tasks = d.getElementById("task-completed").children.length;

    $toDoTemplate.querySelector("label").classList.add("completed");
    $toDoTemplate
      .querySelector("label")
      .setAttribute("for", `task${current_tasks + 1}`);
    $toDoTemplate.querySelector("span").textContent = text;
    $toDoTemplate.querySelector("input").checked = true;
    $toDoTemplate.querySelector("input").id = `task${current_tasks + 1}`;

    let $clone = d.importNode($toDoTemplate, true);
    $taskCompleted.appendChild($clone);

    element.remove();
  } else {
    let current_tasks = d.getElementById("pending-task").children.length;

    $toDoTemplate.querySelector("label").classList.remove("completed");
    $toDoTemplate
      .querySelector("label")
      .setAttribute("for", `task${current_tasks + 1}`);
    $toDoTemplate.querySelector("span").textContent = text;
    $toDoTemplate.querySelector("input").checked = false;
    $toDoTemplate.querySelector("input").id = `task${current_tasks + 1}`;

    let $clone = d.importNode($toDoTemplate, true);
    $pendingTask.appendChild($clone);

    element.remove();
  }
}

d.addEventListener("click", (e) => {
  if (e.target == $addTask) {
    addTask();
  }
});

//Error en la seccion de completados porque no se actualiza el foreach de $task ❌❌❌❌
d.addEventListener("change", (e) => {
  $tasks.forEach((el) => {
    if (e.target == el.querySelector("input")) {
      console.log(el, el.parentElement.id);
      if (el.parentElement.id === "pending-task") {
        console.log($tasks);
        let texto = el.querySelector("span").textContent;
        cambiarEstadoTarea(texto, el, true);
      } else if (el.parentElement.id === "task-completed") {
        console.log($tasks);
        let texto = el.querySelector("label").textContent;
        cambiarEstadoTarea(texto, el, false);
      }
    }
  });
});

//asignar auto con el pending-task.childElements o algo así

//FOR y ID personalizado para el label y el checkbox
