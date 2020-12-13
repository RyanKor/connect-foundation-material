const express = require("express");
const multer = require("multer");
const { isLoggedIn } = require("../controllers/login-middleware");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const router = express.Router();

const postController = require("../controllers/post");

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("Create uploads folders!");
    fs.mkdirSync("uploads");
  }
});

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "us-west-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "sns-coding",
    key(req, file, cb) {
      cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), postController.imgUpload);

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), postController.textUpload);

router.get("/hashtag", postController.hashtagSearch);

module.exports = router;
