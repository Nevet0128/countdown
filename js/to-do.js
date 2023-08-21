const $toDoContainer = d.getElementById('toDo-container'),
  $setTask = d.getElementById('set-task'),
  $newTask = d.getElementById('new-task'),
  $addTask = d.getElementById('add-task'),
  $pendingTask = d.getElementById('pending-task'),
  $completedTask = d.getElementById('completed-task')

const manageTasks = {
  retrieveSavedTasks: () => {
    let retrieveTasks = localStorage.getItem('pendingTasks')

    if (!retrieveTasks) return

    const tasks = Object.values(JSON.parse(retrieveTasks))

    tasks.forEach((el) => manageTasks.moveTask(el, 'new-task'))
  },

  moveTask: function (text, parentElement) {
    if (parentElement == 'new-task') {
      let $li = d.createElement('li')

      $li.textContent = text
      $li.setAttribute('class', 'task')

      $pendingTask.insertAdjacentElement('beforeend', $li)
      $newTask.value = ''
    }

    if (parentElement == 'pending-task') {
      let $li = d.createElement('li')

      $li.textContent = text
      $li.setAttribute('class', 'task completed')

      $completedTask.insertAdjacentElement('beforeend', $li)
    }
  },

  storeTask: (text) => {
    if (!localStorage.getItem('pendingTasks')) {
      localStorage.setItem('pendingTasks', `{"0":"${text}"}`)
    } else {
      const retrieveTasks = Object.values(
        JSON.parse(localStorage.getItem('pendingTasks'))
      )
      retrieveTasks.push(text)
      const updatedTasks = JSON.stringify({ ...retrieveTasks })

      localStorage.setItem('pendingTasks', updatedTasks)
    }
  },

  deleteStoredTask: (text) => {
    const retrieveTasks = Object.values(
        JSON.parse(localStorage.getItem('pendingTasks'))
      ),
      deleteTask = retrieveTasks.filter((el) => el != text),
      updatedTasks = JSON.stringify({ ...deleteTask })

    localStorage.setItem('pendingTasks', updatedTasks)
  },
}

$toDoContainer.addEventListener('click', (e) => {
  d.querySelectorAll('li').forEach((li) => {
    if (e.target == li) {
      let parentElementId = e.target.parentElement.id,
        taskText = e.target.textContent

      if (parentElementId === 'pending-task') {
        // se completa la tarea y pasa a la sección de tareas completadas
        manageTasks.deleteStoredTask(taskText)
        manageTasks.moveTask(taskText, parentElementId)
      }

      e.target.remove()
    }
  })
})

$newTask.addEventListener('keyup', (e) => {
  // enter
  if (e.which === 13) {
    if (!$newTask.value) alert('No puedes añadir una tarea vacía')

    manageTasks.storeTask($newTask.value)
    manageTasks.moveTask($newTask.value, 'new-task')
  }
})

d.addEventListener('click', (e) => {
  // click
  if (e.target == $addTask) {
    if (!$newTask.value) alert('No puedes añadir una tarea vacía')

    manageTasks.storeTask($newTask.value)
    manageTasks.moveTask($newTask.value, 'new-task')
  }
})

document.addEventListener('DOMContentLoaded', manageTasks.retrieveSavedTasks)
