const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentYear: {
    type: String,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("student", studentSchema);
