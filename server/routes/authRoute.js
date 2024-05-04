const express = require("express");
const {
  registerUser,
  signIn,
  getUser,
} = require("../controllers/authController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerUser).all(methodNotAllowed);

router.post("/signin", signIn).all(methodNotAllowed);

router.get("/user", auth, getUser).all(methodNotAllowed);

module.exports = router;
