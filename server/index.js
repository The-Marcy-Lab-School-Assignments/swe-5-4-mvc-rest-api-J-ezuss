const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////

// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos
const listTodo = (req, res) => {
  res.send(todos);
};

// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id
const findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return res.status(404).send({ message: `no task with that id ${id}` });
  }
  res.send(todo);
};
// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body
const createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: 'Invalid input' });
  }
  const newTask = { id: getId(), task, isDone: false };
  todos.push(newTask);
  res.status(201).send(newTask);
};

// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id
const updateTask = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo)
    return res.status(404).send({ message: `no todo with that id ${id}` });

  const { isDone } = req.body;
  todo.isDone = isDone;
  res.send(todo);
};

// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id
const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = todos.findIndex((todo) => todo.id === Number(id));

  if (taskIndex === -1) {
    return res.status(404).send({ message: `no task with that id ${id}` });
  }
  todos.splice(taskIndex, 1);
  return res.status(204).end();
};

app.get('/api/todos', listTodo);
app.get('/api/todos/:id', findTodo);
app.post('/api/todos', createTodo);
app.patch('/api/todos/:id', updateTask);
app.delete('/api/todos/:id', deleteTask);
// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)
app.use((req, res) => {
  res.status(404).send({ message: `Error Not found: [url]` });
});

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
