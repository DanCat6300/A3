const Admin = require("../models/admin");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorsHandler");

exports.signup = (req, res) => {
  const admin = new Admin(req.body);
  admin.save((err, admin) => {
    if (err) {
      return res.status(400).json({
        err: "Username already taken"
      });
    }
    admin.salt = undefined;
    admin.hashed_password = undefined;
    res.json({
      admin
    });
  });
};

exports.signin = (req, res) => {
  const { username, password } = req.body;
  Admin.findOne({ username }, (err, admin) => {
    if (!admin || err) {
      return res.status(400).json({
        error: "User with that username does not existsz"
      });
    }

    if (!admin.authenticate(password)) {
      return res.status(401).json({
        error: "Username and password don't match"
      });
    }
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, username } = admin;
    return res.json({ token, admin: { _id, username } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
