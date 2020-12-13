const express = require("express");

const router = express.Router();

const mainController = require("../controllers/main");

router.get("/", mainController.mainPage);

router.delete("/delete/:id", mainController.deleteTodo);
router.delete("/delete", mainController.deleteAllTodo);

module.exports = router;
