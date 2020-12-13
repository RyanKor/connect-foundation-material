const express = require("express");
const multer = require("multer");
const { isLoggedIn } = require("../controllers/login-middleware");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const postController = require("../controllers/post");

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("Create uploads folders!");
    fs.mkdirSync("uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), postController.imgUpload);

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), postController.textUpload);

router.get("/hashtag", postController.hashtagSearch);

module.exports = router;
