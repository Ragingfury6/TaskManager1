const express = require('express');
const tasksData = require('../data/data');

const getTasks = (req, res) => {
  return res.status(200).json({ success: true, data: tasksData });
};
const createTask = (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    tasksData.push({ name, description });
    return res.status(201).json({ success: true, data: tasksData });
  }
  res.status(400).json({
    success: false,
    data: [],
    msg: 'Please Enter a Valid Information',
  });
};
const updateTask = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const task = tasksData.find((i) => i.id == id);
  if (!task) {
    return res
      .status(404)
      .send({ success: false, data: [], msg: 'Task not Found' });
  }
  if (!(name && description)) {
    return res.status(400).send({
      success: false,
      data: [],
      msg: 'Please Enter Valid Information',
    });
  }
  if (name) task.name = name;
  if (description) task.description = description;
  return res.status(200).send({ success: true, data: tasksData });
};
const deleteTask = (req, res) => {
  const { id } = req.params;
  const task = tasksData.find((i) => i.id == id);
  if (task) {
    tasksData.splice(tasksData.indexOf(id), 1);
    return res.status(200).send({ success: true, data: tasksData });
  }
  res.status(404).send({ success: false, data: [], msg: 'User not Found' });
};
module.exports = { getTasks, createTask, updateTask, deleteTask };
