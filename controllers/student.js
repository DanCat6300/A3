const Student = require("../models/student");

exports.addStudent = (req, res) => {
  const student = new Student({
    studentID: req.body.studentID,
    studentName: req.body.studentName,
    studentYear: req.body.studentYear
  });
  try {
    const newStudent = student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
