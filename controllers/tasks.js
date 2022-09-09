const express = require("express");
const Task = require("../models/Task");
const { getAllTasks, createNewTask, findAndDeleteTask } = require("../helpers");
const getTasks = (req, res) => {
  getAllTasks()
    .then((tasks) => {
      return res.status(200).json({ success: true, data: tasks });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(404);
    });
  // return res.status(200).json({ success: true, data: tasksData });
};
const createTask = (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    createNewTask({ name, description })
      .then((task) => {
        return res.status(201).json({ success: true, data: task });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(400).json({
      success: false,
      data: [],
      msg: "Please Enter Valid Information",
    });
  }
};
const updateTask = (req, res) => {
  // const { id } = req.params;
  // const { name, description } = req.body;
  // const task = tasksData.find((i) => i.id == id);
  // if (!task) {
  //   return res
  //     .status(404)
  //     .send({ success: false, data: [], msg: "Task not Found" });
  // }
  // if (!(name && description)) {
  //   return res.status(400).send({
  //     success: false,
  //     data: [],
  //     msg: "Please Enter Valid Information",
  //   });
  // }
  // if (name) task.name = name;
  // if (description) task.description = description;
  // return res.status(200).send({ success: true, data: tasksData });
};
const deleteTask = (req, res) => {
  const { _id } = req.body;
  if (_id) {
    findAndDeleteTask({ _id })
      .then((task) => {
        if (!task) {
          return res
            .status(404)
            .json({ sucess: false, data: [], msg: "User Not Found" });
        } else {
          return res.status(200).json({ success: true, data: task });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res
      .status(400)
      .json({ success: false, data: [], msg: "Please Enter all Information" });
  }
};
module.exports = { getTasks, createTask, updateTask, deleteTask };
