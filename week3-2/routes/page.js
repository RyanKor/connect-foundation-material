const express = require("express");
const {
  isLoggedIn,
  isNotLoggedIn,
} = require("../controllers/login-middleware");
const pageController = require("../controllers/page");

const router = express.Router();

router.get("/join", isNotLoggedIn, pageController.signUp);

router.get("/", pageController.mainPage);

router.get("/profile", isLoggedIn, pageController.profile);

module.exports = router;
