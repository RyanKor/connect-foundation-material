const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.set("port", process.env.PORT || 3000); //포트 연동에 유의하지 않으면 렌더링 화면이 보이지 않는다.

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(express.json());
// Naver Developer Platform
var fs = require("fs");

app.get("/face", function (req, res) {
  var request = require("request");
  var api_url = "https://openapi.naver.com/v1/vision/face";
  var _formData = {
    image: "image",
    image: fs.createReadStream(path.join(__dirname + "/public/profile.jpg")), // image
  };
  var _req = request
    .post({
      url: api_url,
      formData: _formData,
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_SECRET_KEY,
      },
    })
    .on("response", function (response) {
      console.log(response.statusCode); // 200
      console.log(response.headers["content-type"]);
    });
  _req.pipe(res); // result
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
