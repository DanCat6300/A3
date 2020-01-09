const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    // students: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "student"
    //   }
    // ],
    course: {
      type: String,
      required: true
    },
    semester: {
      type: String,
      required: true
    },
    technologyUsed: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    }
    // photo: {
    //   type: Buffer,
    //   contentType: String
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectSchema);
