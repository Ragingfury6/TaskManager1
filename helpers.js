const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const Task = require("./models/Task");
require("dotenv").config();
const getAllTasks = async () => {
  let tasks = await Task.find({});
  return tasks;
};
const createNewTask = async ({ name, description }) => {
  return new Promise((resolve, reject) => {
    Task.create({ name, description }, function (err, task) {
      if (err) reject(new Error(err));
      resolve(task);
    });
  });
};
const findAndDeleteTask = async ({ _id }) => {
  return new Promise((resolve, reject) => {
    Task.findByIdAndDelete(_id, function (err, task) {
      if (err) reject(new Error(err));
      // if (!task) reject(new Error("No Task Found"));
      resolve(task);
    });
  });
};

module.exports = { getAllTasks, createNewTask, findAndDeleteTask };
