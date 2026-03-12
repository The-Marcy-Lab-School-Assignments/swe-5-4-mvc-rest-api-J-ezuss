export const renderTodos = (todos) => {
  const list = document.querySelector('#todos-list');
  list.innerHTML = '';

  todos.forEach((todo) => {
    const { id, task, isDone } = todo;
    const li = document.createElement('li');
    li.dataset.id = id;
    if (isDone) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isDone;
    checkbox.classList.add('toggle-btn');
    checkbox.setAttribute('aria-label', `Mark "${task}" as ${isDone ? 'not done' : 'done'}`);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    li.append(checkbox, taskSpan, deleteBtn);
    list.append(li);
  });
};

export const renderError = (msg) => {
  const errorEl = document.querySelector('#error');

  if (!msg) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
    return;
  }

  errorEl.classList.remove('hidden');
  errorEl.textContent = msg;
};
