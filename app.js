const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const path = require("path");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 9000;
app.use(express.static(path.join(__dirname, "/build")));

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

const uri =
  "mongodb+srv://DaLy630:G10Vp0kZs3XHlgzi@danclst-p3pqq.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const studentRouter = require("./routes/students");
const adminRouter = require("./routes/admins");
const courseRouter = require("./routes/courses");
const assignmentRouter = require("./routes/assignments");
const projectRouter = require("./routes/projects");

app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/admins", adminRouter);
app.use("/assignments", assignmentRouter);
app.use("/projects", projectRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
