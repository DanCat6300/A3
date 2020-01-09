const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Project = require("../models/project");
const { errorHandler } = require("../helpers/dbErrorsHandler");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    // check for all fields
    const { name, semester, scope, course, description, company } = fields;

    if (!name || !semester || !scope || !course || !description || !company) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    let project = new Project(fields);

    project.save((err, result) => {
      if (err) {
        console.log("PRODUCT CREATE ERROR ", err);
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};
