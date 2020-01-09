const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("course", courseSchema);
