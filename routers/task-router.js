const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

router
  .route('/')
  .get(getTasks)
  .post(createTask)
  .delete(deleteTask)
  .put(updateTask);

module.exports = router;
