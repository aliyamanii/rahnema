var taskList = [];
function addTask() {
    var titleInput = document.querySelector(".task-input");
    var stateInput = document.querySelector(".state-input");
    var labelInput = document.querySelector(".label-input");
    var title = titleInput.value.trim();
    var state = stateInput.value;
    var label = labelInput.value.trim();
    if (title === "")
        return;
    var newTask = { title: title, state: state, label: label };
    taskList.push(newTask);
    renderTasks();
    clearInputFields();
}
function removeTask(index) {
    taskList.splice(index, 1);
    renderTasks();
}
function renderTasks() {
    var taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";
    taskList.forEach(function (task, index) {
        var listItem = document.createElement("li");
        listItem.innerHTML = "\n        <span>".concat(task.title, "</span>\n        <button class=\"remove-button\" onclick=\"removeTask(").concat(index, ")\">Remove</button>\n        <select class=\"status-dropdown\" onchange=\"changeTaskState(").concat(index, ", this.value)\">\n          <option value=\"todo\"").concat(task.state === "todo" ? " selected" : "", ">Todo</option>\n          <option value=\"doing\"").concat(task.state === "doing" ? " selected" : "", ">Doing</option>\n          <option value=\"done\"").concat(task.state === "done" ? " selected" : "", ">Done</option>\n        </select>\n        <span class=\"label\">").concat(task.label, "</span>\n      ");
        taskListElement.appendChild(listItem);
    });
}
function changeTaskState(index, newState) {
    taskList[index].state = newState;
}
function filterTasks() {
    var filterInput = document.querySelector(".search-input");
    var filterValue = filterInput.value.trim().toLowerCase();
    var filteredTasks = taskList.filter(function (task) {
        return task.title.toLowerCase().includes(filterValue) ||
            task.state.toLowerCase().includes(filterValue) ||
            task.label.toLowerCase().includes(filterValue);
    });
    var taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";
    filteredTasks.forEach(function (task, index) {
        var listItem = document.createElement("li");
        listItem.innerHTML = "\n        <span>".concat(task.title, "</span>\n        <button class=\"remove-button\" onclick=\"removeTask(").concat(index, ")\">Remove</button>\n        <select class=\"status-dropdown\" onchange=\"changeTaskState(").concat(index, ", this.value)\">\n          <option value=\"todo\"").concat(task.state === "todo" ? " selected" : "", ">Todo</option>\n          <option value=\"doing\"").concat(task.state === "doing" ? " selected" : "", ">Doing</option>\n          <option value=\"done\"").concat(task.state === "done" ? " selected" : "", ">Done</option>\n        </select>\n        <span class=\"label\">").concat(task.label, "</span>\n      ");
        taskListElement.appendChild(listItem);
    });
}
function clearInputFields() {
    var titleInput = document.querySelector(".task-input");
    var labelInput = document.querySelector(".label-input");
    titleInput.value = "";
    labelInput.value = "";
}
document.addEventListener("DOMContentLoaded", function () {
    renderTasks();
});
