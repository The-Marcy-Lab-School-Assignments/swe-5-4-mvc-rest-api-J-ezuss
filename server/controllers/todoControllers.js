const todoModel = require('../models/todoModel.js');

// Get All (Read)
// Create

module.exports.listTodos = (req, res) => {
  const todoList = todoModel.list();
  res.send(todoList);
};

// Get One (Read)
module.exports.findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todoModel.find(Number(id));

  if (!todo) {
    return res.status(404).send({
      message: `No todo with the id ${id}`,
    });
  }
  res.send(todo);
};

module.exports.createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: 'Invalid Name' });
  }

  const newTodo = todoModel.create(task);
  res.send(newTodo);
};

// Update
module.exports.updateTodo = (req, res) => {
  const { isDone } = req.body;
  const { id } = req.params;
  const todo = todoModel.update(Number(id), isDone);

  if (!todo)
    return res.status(404).send({
      message: `No todo with the id ${id}`,
    });
  res.send(todo);
};

// Delete
module.exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const didDelete = todoModel.destroy(Number(id));

  if (!didDelete) {
    res.status(404).send({
      message: `No todo with the id ${id}`,
    });
  }

  res.send(didDelete);
};
