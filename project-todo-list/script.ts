const task__input: HTMLElement = document.querySelector('.task__input')!;
const add__button: HTMLElement = document.querySelector('.add__button')!;


add__button.addEventListener('click', () => {
    const task = task__input.innerText.trim();
    if (task !== '') {
        console.log("something")
    //   const li = document.createElement('li');
    //   li.innerHTML = `<span>${task}</span><button>Delete</button>`;
    //   taskList.appendChild(li);
    //   taskInput.value = '';
    //   saveTasks();
    }
  });