const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
// 클로바 관리
axios.defaults.timeout = 10000;
require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.set("port", process.env.PORT || 3000); //포트 연동에 유의하지 않으면 렌더링 화면이 보이지 않는다.

app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "uploads"))); // 이 한 줄이 갖는 코드의 의미가 크다.
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(express.json());

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
app.get("/", (req, res, next) => {
  res.render("main");
});

app.post("/image", upload.single("image"), async (req, res, next) => {
  console.log(req);
  const filePath = req.file.path;
  let api_url = "https://openapi.naver.com/v1/vision/face";
  let form = new FormData();
  form.append(
    "image",
    fs.createReadStream(path.join(`${__dirname}/` + filePath))
  );
  await axios
    .post(api_url, form, {
      headers: {
        // axios에서는 content-type을 자동으로 바꿔주지 않기 때문에
        // 다음과 같이 header를 넣어주어야 합니다
        ...form.getHeaders(),
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_SECRET_KEY,
      },
    })
    .then((response) => {
      console.log(response.data);
      return res.json({
        faces: response.data.faces,
        url: `/image/${req.file.filename}`,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "is listening");
});
