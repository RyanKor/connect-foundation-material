const express = require("express");
const authController = require("../controllers/auth");
const {
  isLoggedIn,
  isNotLoggedIn,
} = require("../controllers/login-middleware");

const router = express.Router();

router.post("/join", isNotLoggedIn, authController.userSignup);

router.post("/login", isNotLoggedIn, authController.localLogin);

router.get("/logout", isLoggedIn, authController.logOut);

router.get("/google", authController.getGoogleLogin);

router.get("/google/callback", authController.SignupGoogleLogin);

module.exports = router;
