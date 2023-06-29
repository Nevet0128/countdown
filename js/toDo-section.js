const $setTask = d.getElementById("set-task"),
  $newTask = d.getElementById("new-task"),
  $addTask = d.getElementById("add-task"),
  $pendingTask = d.getElementById("pending-task"),
  $completedTask = d.getElementById("completed-task");

function manageTask(text, parentElement) {
  //let taskList = JSON.parse(localStorage.getItem("tasks")); esa recomendación ta buena para guardar las tareas

  if (parentElement == "new-task" || parentElement == "completed-task") {
    let $li = d.createElement("li");
    $li.textContent = text;
    $li.setAttribute("class", "task");

    $pendingTask.appendChild($li);
    $newTask.value = "";
  }

  if (parentElement == "pending-task") {
    let $li = d.createElement("li");
    $li.textContent = text;
    $li.setAttribute("class", "task completed");

    $completedTask.appendChild($li);
  }
}

d.addEventListener("click", (e) => {
  if (e.target == $addTask) {
    !$newTask.value
      ? alert("No puedes añadir una tarea vacía")
      : manageTask($newTask.value, "new-task");
  }

  d.querySelectorAll("li").forEach((li) => {
    if (e.target == li) {
      let parentElementId = e.target.parentElement.id,
        taskText = e.target.textContent;

      console.log("tarea:", e.target.textContent, "padre:", parentElementId);

      e.target.remove();
      manageTask(taskText, parentElementId);
    }
  });
});
