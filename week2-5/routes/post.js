const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.post("/", postController.postTodo);
router.put("/:id", postController.checkTodo);
module.exports = router;
