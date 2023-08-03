var tasks = [];
function addTask(title) {
  var newTask = {
    title: title,
    status: "todo",
  };
  tasks.push(newTask);
}
function removeTask(index) {
  tasks.splice(index, 1);
}
function updateTaskStatus(index, status) {
  tasks[index].status = status;
}
function addLabel(index, label) {
  if (!tasks[index].labels) {
    tasks[index].labels = [];
  }
  tasks[index].labels.push(label);
}
function removeLabel(index, label) {
  if (tasks[index].labels) {
    tasks[index].labels = tasks[index].labels.filter(function (l) {
      return l !== label;
    });
  }
}
function filterTasks(filter) {
  var filteredTasks = tasks.filter(function (task) {
    return (
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      task.status.toLowerCase().includes(filter.toLowerCase()) ||
      (task.labels &&
        task.labels.some(function (label) {
          return label.toLowerCase().includes(filter.toLowerCase());
        }))
    );
  });
  renderTasks(filteredTasks);
}
function renderTasks(taskList) {
  var listContainer = document.querySelector(".list__container");
  listContainer.innerHTML = "";
  taskList.forEach(function (task, index) {
    var li = document.createElement("li");
    li.classList.add("task-item");
    var leftDiv = document.createElement("div");
    leftDiv.classList.add("left");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change", function () {
      return updateTaskStatus(index, checkbox.checked ? "done" : "todo");
    });
    var title = document.createTextNode(task.title);
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(title);
    li.appendChild(leftDiv);
    if (task.labels) {
      task.labels.forEach(function (label) {
        var labelCheckbox = document.createElement("input");
        labelCheckbox.type = "checkbox";
        labelCheckbox.classList.add(
          "checkbox",
          "".concat(label.toLowerCase(), "-checkbox")
        );
        labelCheckbox.addEventListener("change", function () {
          return labelCheckbox.checked
            ? addLabel(index, label)
            : removeLabel(index, label);
        });
        li.appendChild(labelCheckbox);
      });
    }
    var dropdown = document.createElement("select");
    dropdown.classList.add("status-dropdown");
    dropdown.addEventListener("change", function () {
      return updateTaskStatus(index, dropdown.value);
    });
    var todoOption = document.createElement("option");
    todoOption.value = "todo";
    todoOption.text = "Todo";
    var doingOption = document.createElement("option");
    doingOption.value = "doing";
    doingOption.text = "Doing";
    var doneOption = document.createElement("option");
    doneOption.value = "done";
    doneOption.text = "Done";
    dropdown.appendChild(todoOption);
    dropdown.appendChild(doingOption);
    dropdown.appendChild(doneOption);
    li.appendChild(dropdown);
    listContainer.appendChild(li);
  });
}
// Add event listeners for adding tasks and filtering
document.addEventListener("DOMContentLoaded", function () {
  var addButton = document.querySelector(".add__button");
  var searchInput = document.querySelector(".search__input");
  addButton.addEventListener("click", function () {
    var inputBar = document.querySelector(".input__bar");
    var taskTitle = inputBar.value.trim();
    if (taskTitle !== "") {
      addTask(taskTitle);
      inputBar.value = "";
      renderTasks(tasks);
    }
  });
  searchInput.addEventListener("input", function () {
    var searchFilter = searchInput.value.trim();
    filterTasks(searchFilter);
  });
});
// Initial render of tasks
renderTasks(tasks);
