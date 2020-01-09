const Course = require("../models/course");

exports.addCourse = (req, res) => {
  const course = new Course({
    courseID: req.body.courseID,
    courseName: req.body.courseName
  });
  try {
    const newCourse = course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
