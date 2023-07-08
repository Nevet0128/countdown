const $toDoContainer = d.getElementById("toDo-container"),
  $setTask = d.getElementById("set-task"),
  $newTask = d.getElementById("new-task"),
  $addTask = d.getElementById("add-task"),
  $pendingTask = d.getElementById("pending-task"),
  $completedTask = d.getElementById("completed-task");

function manageTask(text, parentElement) {
  //let taskList = JSON.parse(localStorage.getItem("tasks")); esa recomendación ta buena para guardar las tareas

  //if (parentElement == "new-task" || parentElement == "completed-task")
  if (parentElement == "new-task") {
    let $li = d.createElement("li");

    $li.textContent = text;
    $li.setAttribute("class", "task");

    $pendingTask.insertAdjacentElement("beforeend", $li);
    $newTask.value = "";
  }

  if (parentElement == "pending-task") {
    let $li = d.createElement("li");

    $li.textContent = text;
    $li.setAttribute("class", "task completed");

    $completedTask.insertAdjacentElement("beforeend", $li);
  }
}

$newTask.addEventListener("keyup", (e) => {
  if (e.which === 13) {
    !$newTask.value
      ? alert("No puedes añadir una tarea vacía")
      : manageTask($newTask.value, "new-task");
  }
});

d.addEventListener("click", (e) => {
  if (e.target == $addTask) {
    !$newTask.value
      ? alert("No puedes añadir una tarea vacía")
      : manageTask($newTask.value, "new-task");
  }
});

$toDoContainer.addEventListener("click", (e) => {
  d.querySelectorAll("li").forEach((li) => {
    if (e.target == li) {
      let parentElementId = e.target.parentElement.id,
        taskText = e.target.textContent;

      //console.log("tarea:", e.target.textContent, "padre:", parentElementId);

      e.target.remove();

      if (!(parentElementId == "completed-task")) {
        manageTask(taskText, parentElementId);
      }
    }
  });
});
