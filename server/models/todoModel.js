// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

// TODO: Return a copy of all pets.
module.exports.list = () => {
  return [...todos];
};

module.exports.find = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  return { ...todo };
};

module.exports.create = (task) => {
  const newTodo = { id: getId(), task, isDone: false };
  todos.push(newTodo);
  return { ...newTodo };
};

module.exports.update = (id, isDone) => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return null;
  todo.isDone = isDone;
  return { ...todo };
};

module.exports.destroy = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return false;
  }
  const deletedTodo = todos.splice(todoIndex, 1);
  console.log(deletedTodo);
  return deletedTodo;
};
