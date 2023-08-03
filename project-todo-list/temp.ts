interface TaskItem {
    title: string;
    state: string;
    label: string;
  }
  
  const taskList: TaskItem[] = [];
  
  function addTask(): void {
    const titleInput = document.querySelector(".task-input") as HTMLInputElement;
    const stateInput = document.querySelector(".state-input") as HTMLSelectElement;
    const labelInput = document.querySelector(".label-input") as HTMLSelectElement;

    const title = titleInput.value.trim();
    const state = stateInput.value;
    const label = labelInput.value;    
    
    if (title === "") return;
  
    const newTask: TaskItem = { title, state, label };
    taskList.push(newTask);
    renderTasks();
    clearInputFields();
  }
  
  function removeTask(index: number): void {
    taskList.splice(index, 1);
    renderTasks();
  }
  
  function renderTasks(): void {
    const taskListElement = document.getElementById("taskList") as HTMLUListElement;
    taskListElement.innerHTML = "";
  
    taskList.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${task.title}</span>
        <button class="remove-button" onclick="removeTask(${index})">Remove</button>
        <select class="status-dropdown" onchange="changeTaskState(${index}, this.value)">
          <option value="todo"${task.state === "todo" ? " selected" : ""}>Todo</option>
          <option value="doing"${task.state === "doing" ? " selected" : ""}>Doing</option>
          <option value="done"${task.state === "done" ? " selected" : ""}>Done</option>
        </select>
        <span class="label">${task.label}</span>
      `;
      taskListElement.appendChild(listItem);
    });
  }
  
  function changeTaskState(index: number, newState: string): void {
    taskList[index].state = newState;
  }
  
  function filterTasks(): void {
    const filterInput = document.querySelector(".search-input") as HTMLInputElement;
    const filterValue = filterInput.value.trim().toLowerCase();
    const filteredTasks = taskList.filter(
      task =>
        task.title.toLowerCase().includes(filterValue) ||
        task.state.toLowerCase().includes(filterValue) ||
        task.label.toLowerCase().includes(filterValue)
    );
    const taskListElement = document.getElementById("taskList") as HTMLUListElement;
    taskListElement.innerHTML = "";
  
    filteredTasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${task.title}</span>
        <button class="remove-button" onclick="removeTask(${index})">Remove</button>
        <select class="status-dropdown" onchange="changeTaskState(${index}, this.value)">
          <option value="todo"${task.state === "todo" ? " selected" : ""}>Todo</option>
          <option value="doing"${task.state === "doing" ? " selected" : ""}>Doing</option>
          <option value="done"${task.state === "done" ? " selected" : ""}>Done</option>
        </select>
        <span class="label">${task.label}</span>
      `;
      taskListElement.appendChild(listItem);
    });
  }
  
  function clearInputFields(): void {
    const titleInput = document.querySelector(".task-input") as HTMLInputElement;
    const labelInput = document.querySelector(".label-input") as HTMLInputElement;
  
    titleInput.value = "";
    labelInput.value = "";
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
  });
  