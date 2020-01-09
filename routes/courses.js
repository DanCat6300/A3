const express = require("express");
const router = express.Router();
const Course = require("../models/course.js");
const { createCourseValidator } = require("../validator");
const { addCourse } = require("../controllers/course");

// Getting All
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getCourse, (req, res) => {
  res.json(res.course);
});

// Creating One
router.post("/", createCourseValidator, addCourse);

// Upadating One
router.put("/:id", getCourse, async (req, res) => {
  if (req.body.courseID != null) {
    res.course.courseID = req.body.courseID;
  }
  if (req.body.courseName != null) {
    res.course.courseName = req.body.courseName;
  }
  try {
    const updatedCourse = await res.course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getCourse, async (req, res) => {
  try {
    await res.course.remove();
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCourse(req, res, next) {
  let course;
  try {
    course = await Course.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({ message: "Cannot find course" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.course = course;
  next();
}

module.exports = router;
