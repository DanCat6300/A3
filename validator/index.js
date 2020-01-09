exports.createAdminValidator = (req, res, next) => {
  req.check("username", "Username is required").notEmpty();
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.createStudentValidator = (req, res, next) => {
  req.check("studentID", "Student ID is required").notEmpty();
  req.check("studentName", "Student name is required").notEmpty();
  req.check("studentYear", "Student year is required").notEmpty();
  req
    .check("studentYear")
    .isNumeric()
    .withMessage("Student year must be a number");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.createCourseValidator = (req, res, next) => {
  req.check("courseID", "Course ID is required").notEmpty();
  req.check("courseName", "Course name is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
