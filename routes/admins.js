const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin
} = require("../controllers/admin");
const { createAdminValidator } = require("../validator");

router.post("/signup", createAdminValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
