const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignments.js");

// Getting All
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getAssignment, (req, res) => {
  res.json(res.assignment);
});

// Creating One
router.post("/add", async (req, res) => {
  const assignment = new Assignment({
    assignmentName: req.body.assignmentName,
    assignmentDescription: req.body.assignmentDescription,
    assignmentPercentage: req.body.assignmentPercentage
  });
  try {
    const newAssignment = await assignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Upadating One
router.patch("/:id", getAssignment, async (req, res) => {
  if (req.body.assignmentName != null) {
    res.assignment.assignmentName = req.body.assignmentName;
  }
  if (req.body.assignmentDescription != null) {
    res.assignment.assignmentDescription = req.body.assignmentDescription;
  }
  if (req.body.assignmentPercentage != null) {
    res.assignment.assignmentPercentage = req.body.assignmentPercentage;
  }
  try {
    const updateAssignment = await res.assignment.save();
    res.json(updateAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getAssignment, async (req, res) => {
  try {
    await res.assignment.remove();
    res.json({ message: "Deleted Assignment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getAssignment(req, res, next) {
  let assignment;
  try {
    assignment = await Assignment.findById(req.params.id);
    if (assignment == null) {
      return res.status(404).json({ message: "Cannot find assignment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.assignment = assignment;
  next();
}

module.exports = router;
