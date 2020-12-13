const express = require("express");

const { isLoggedIn } = require("../controllers/login-middleware");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/:id/follow", isLoggedIn, userController.follow);

module.exports = router;
