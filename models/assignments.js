const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assignmentName: {
    type: String,
    required: true
  },
  assignmentDescription: {
    type: String,
    required: true
  },
  assignmentPercentage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("assignment", assignmentSchema);
