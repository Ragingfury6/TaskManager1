const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'Must Provide Name'],
    trim: true,
    maxLength: [25, 'Name must be less than 25 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: 'string',
    required: false,
    trim: true,
    maxLength: [150, 'Description must be less than 150 characters'],
  },
});
module.exports = mongoose.model('Task', TaskSchema);
Model.find({ completed: true });
