const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const connect = require("./schemas");

const app = express();
connect();

const mainRouter = require("./routes/main");
const postRouter = require("./routes/post");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 3000); //포트 연동에 유의하지 않으면 렌더링 화면이 보이지 않는다.

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", mainRouter);
app.use("/post", postRouter);

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
