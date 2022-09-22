const mongoose = require('mongoose');
const CarsSchema = new mongoose.Schema({
  brand: {
    type: 'string',
    required: [true, 'Must Provide brand'],
    trim: true,
    maxLength: [15, 'Name must be less than 15 characters'],
  },
  model: {
    type: 'string',
    required: [true, 'Must Provide model'],
    trim: true,
    maxLength: [15, 'Name must be less than 15 characters'],
  },
  year: {
    type: Number,
    required: true,
  },
  package: {
    type: 'string',
    required: false,
    trim: true,
    maxLength: [15, 'Package must be less than 15 characters'],
  },
});
module.exports = mongoose.model('Cars', CarsSchema);
// Model.find({ completed: true });
