const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const connect = require("./schemas");

const app = express();
connect();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);
