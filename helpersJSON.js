require('dotenv').config();
const fs = require('fs');
const data = fs.readFileSync('./data/tasks.json', { encoding: 'utf8' });
let tasks = JSON.parse(data);
const getAllTasks = async () => {
  return tasks;
};
const createNewTask = async ({ name, description }) => {
  if (name && description) {
    let newTask = { name, description };
    let highestID = tasks.sort((a, b) => b._id - a._id)[0]._id;
    console.log(highestID);
    newTask._id = Number(highestID) + 1;
    tasks.push(newTask);
    return newTask;
  }
  return new Error();
};
const findAndDeleteTask = async ({ _id }) => {
  if (_id) {
    for (let task of tasks) {
      if (task.id == _id) {
        return tasks.splice(task);
      }
    }
  }
  return new Error();
};
const findAndUpdateTask = async ({ _id, name, description }) => {
  if (_id >= 0 && name && description) {
    for (let task of tasks) {
      if (task._id == _id) {
        let newTask = { _id, name, description };
        tasks[tasks.indexOf(task)] = newTask;
        return newTask;
      }
    }
    return new Error();
  }
  return new Error();
};
module.exports = {
  getAllTasks,
  createNewTask,
  findAndDeleteTask,
  findAndUpdateTask,
};
