const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  department: String
});

module.exports = mongoose.model('Student', studentSchema);
