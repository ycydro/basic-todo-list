let taskArr = loadTasks();

displayTasks();

function addTask() {
   const taskName = document.getElementById('task-input');
   const taskDeadline = document.getElementById('deadline');
   // increment the taskId depending on length of the task array
   const taskId = taskArr.length + 1;

   // checks if input is invalid
   if (!taskName.value || !taskDeadline.value) {
      displayStatusMessage('error', 'Please insert valid inputs!')
      return;
   }

   // adds a task object with id, name, and deadline property
   taskArr.push({id: taskId, name: taskName.value, deadline: taskDeadline.value});

   // add the task row to the dom

   displayTasks();
   displayStatusMessage('success', 'Successfuly added task!')
   clearInputs();
   saveTasks();
}


function deleteTask(taskId) {
   // retrieves the div row with a class name of taskId 
   // i.e. taskId = task1
   const taskRow = document.querySelector(`.${taskId}`);

    for (let i = 0; i < taskArr.length; i++) {
      // retrieve the integer from taskId
      // i.e. if taskId is 'task1', remove 'task' to get '1'
      const realTaskId = taskId.replace('task', '');

      // turn string to number before comparing
      if (Number(realTaskId) === taskArr[i].id) {
         // remove element in index 'i'
         taskArr.splice(i, 1)
         // remove the row corresponding to taskId
         taskRow.remove();
         displayStatusMessage('error', 'Deleted a task!')
         break;
      }
   }
   console.log(taskArr.length);
   saveTasks();
}

function displayTasks() {
   // retrives the container where the task rows will be placed
   const taskContainer = document.querySelector('.tasks');

   let todoListHTML = '';

   for (let i = 0; i < taskArr.length; i++) {
      const id = taskArr[i].id;
      const name = taskArr[i].name;
      const deadline = taskArr[i].deadline;

      todoListHTML += 
      `
      <div class="todo-row task${id}">
      <div class="todo-name">${name}</div>
      <div class="todo-date">${deadline}</div>
      <button id="task${id}" 
         class="task-btn delete-button" 
         onclick="deleteTask(this.id)"
      >
         Delete
      </button>
      </div>
      `
   }

   taskContainer.innerHTML = todoListHTML;

   // add a task row
   // taskContainer.innerHTML += `
   // <div class="todo-row task${id}">
   // <div class="todo-name">${name}</div>
   // <div class="todo-date">${deadline}</div>
   // <button id="task${id}" 
   //    class="task-btn delete-button" 
   //    onclick="deleteTask(this.id)"
   // >
   //    Delete
   // </button>`
}

function displayStatusMessage(status, message) {
   const statusElement = document.querySelector('.status-message');

   removeCurrentStatus();

   if (status === 'error') {
      statusElement.classList.add('error-message');
   } else if (status === 'success')  {
      statusElement.classList.add('success-message');
   }

   statusElement.innerHTML = message;
}

function removeCurrentStatus() {
   const statusElement = document.querySelector('.status-message');
   if(statusElement.classList.contains('error-message')) {
      statusElement.classList.remove('error-message')
   } else if (statusElement.classList.contains('success-message')) {
      statusElement.classList.remove('success-message')
   } else {
      return;
   }
}

function clearInputs() {
   const taskName = document.getElementById('task-input');
   const taskDeadline = document.getElementById('deadline');

   taskName.value = '';
   taskDeadline.value = null;
}

function saveTasks() {
   const tasksStringified = JSON.stringify(taskArr);
   localStorage.setItem('savedTasks', tasksStringified) 
}

function loadTasks() {
   const getTasks = localStorage.getItem('savedTasks');
   const retrievedTasks = JSON.parse(getTasks);

   let tasksArr = retrievedTasks || [];

   return tasksArr;
}

