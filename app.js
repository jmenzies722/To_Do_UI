// Get references to DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed');

// Store todos in an array
let todos = [];

// Add event listener for form submit
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    addTodoItem(todoText);
    todoInput.value = '';
  }
});

// Add event listener for delete button click
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const todoItem = event.target.closest('.todo-item');
    const todoId = parseInt(todoItem.getAttribute('data-todo-id'));
    deleteTodoItem(todoId);
  }
});

// Add event listener for clear completed button click
clearCompletedButton.addEventListener('click', () => {
  clearCompletedTodoItems();
});

// Add a new todo item to the list
function addTodoItem(text) {
  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    text: text,
    completed: false
  };
  todos.push(newTodo);
  renderTodoList();
}

// Delete a todo item from the list
function deleteTodoItem(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodoList();
}

// Clear all completed todo items from the list
function clearCompletedTodoItems() {
    todos = todos.filter(todo => !todo.completed);
    renderTodoList();
  
    if (todos.length === 0) {
      clearCompletedButton.style.display = 'none';
    } else {
      clearCompletedButton.style.display = 'inline-block';
    }
  }
  

// Render the todo list to the DOM
function renderTodoList() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.setAttribute('data-todo-id', todo.id);

    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.innerText = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'Delete';

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);

    if (todo.completed) {
      todoItem.classList.add('checked');
    }

    todoList.appendChild(todoItem);
  });
}
