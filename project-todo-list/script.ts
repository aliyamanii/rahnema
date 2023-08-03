interface Task {
    title: string;
    status: 'todo' | 'doing' | 'done';
    labels?: string[];
  }
  
  let tasks: Task[] = [];
  
  function addTask(title: string) {
    const newTask: Task = {
      title: title,
      status: 'todo'
    };
    tasks.push(newTask);
  }
  
  function removeTask(index: number) {
    tasks.splice(index, 1);
  }
  
  function updateTaskStatus(index: number, status: 'todo' | 'doing' | 'done') {
    tasks[index].status = status;
  }
  
  function addLabel(index: number, label: string) {
    if (!tasks[index].labels) {
      tasks[index].labels = [];
    }
    tasks[index].labels.push(label);
  }
  
  function removeLabel(index: number, label: string) {
    if (tasks[index].labels) {
      tasks[index].labels = tasks[index].labels.filter((l) => l !== label);
    }
  }
  
  function filterTasks(filter: string) {
    const filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(filter.toLowerCase()) ||
        task.status.toLowerCase().includes(filter.toLowerCase()) ||
        (task.labels && task.labels.some((label) => label.toLowerCase().includes(filter.toLowerCase())))
    );
    renderTasks(filteredTasks);
  }
  
  function renderTasks(taskList: Task[]) {
    const listContainer = document.querySelector('.list__container');
    listContainer.innerHTML = '';
  
    taskList.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('task-item');
  
      const leftDiv = document.createElement('div');
      leftDiv.classList.add('left');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('change', () => updateTaskStatus(index, checkbox.checked ? 'done' : 'todo'));
  
      const title = document.createTextNode(task.title);
  
      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(title);
  
      li.appendChild(leftDiv);
  
      if (task.labels) {
        task.labels.forEach((label) => {
          const labelCheckbox = document.createElement('input');
          labelCheckbox.type = 'checkbox';
          labelCheckbox.classList.add('checkbox', `${label.toLowerCase()}-checkbox`);
          labelCheckbox.addEventListener('change', () =>
            labelCheckbox.checked ? addLabel(index, label) : removeLabel(index, label)
          );
  
          li.appendChild(labelCheckbox);
        });
      }
  
      const dropdown = document.createElement('select');
      dropdown.classList.add('status-dropdown');
      dropdown.addEventListener('change', () => updateTaskStatus(index, dropdown.value as 'todo' | 'doing' | 'done'));
  
      const todoOption = document.createElement('option');
      todoOption.value = 'todo';
      todoOption.text = 'Todo';
  
      const doingOption = document.createElement('option');
      doingOption.value = 'doing';
      doingOption.text = 'Doing';
  
      const doneOption = document.createElement('option');
      doneOption.value = 'done';
      doneOption.text = 'Done';
  
      dropdown.appendChild(todoOption);
      dropdown.appendChild(doingOption);
      dropdown.appendChild(doneOption);
  
      li.appendChild(dropdown);
  
      listContainer.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add__button');
    const searchInput = document.querySelector('.search__input');
  
    addButton.addEventListener('click', () => {
      const inputBar = document.querySelector('.input__bar');
      const taskTitle = inputBar.value.trim();
      if (taskTitle !== '') {
        addTask(taskTitle);
        inputBar.value = '';
        renderTasks(tasks);
      }
    });
  
    searchInput.addEventListener('input', () => {
      const searchFilter = searchInput.value.trim();
      filterTasks(searchFilter);
    });
  });
  
  renderTasks(tasks);
  