const express = require("express");
const router = express.Router();
const Project = require("../models/project.js");

// Create
const { create } = require("../controllers/project");

router.post("/", create);

// Getting All
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getProject, (req, res) => {
  res.json(res.project);
});

// Upadating One
router.put("/:id", getProject, async (req, res) => {
  if (req.body.students != null) {
    res.course.students = req.body.students;
  }
  if (req.body.course != null) {
    res.course.course = req.body.course;
  }
  if (req.body.semester != null) {
    res.course.semester = req.body.semester;
  }
  if (req.body.assignment != null) {
    res.course.assignment = req.body.assignment;
  }
  if (req.body.technologyUsed != null) {
    res.course.technologyUsed = req.body.technologyUsed;
  }
  if (req.body.scope != null) {
    res.course.scope = req.body.scope;
  }
  if (req.body.description != null) {
    res.course.description = req.body.description;
  }
  if (req.body.company != null) {
    res.course.company = req.body.company;
  }
  if (req.body.application != null) {
    res.course.application = req.body.application;
  }
  if (req.body.photo != null) {
    res.course.photo = req.body.photo;
  }
  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: "Deleted Project" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Cannot find project" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

module.exports = router;
