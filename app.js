var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var weather = require("openweather-apis");
require("dotenv").config();

weather.setLang("tr");
weather.setUnits("metric");
weather.setAPPID(process.env.WEATHER_APPID);

var indexRouter = require("./routes/index");
var chatRouter = require("./routes/chat");
var weatherRouter = require("./routes/weather");
var aboutRouter = require("./routes/about");

var getWeatherRouter = require("./routes/getWeather");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/index", indexRouter);
app.use("/chat", chatRouter);
app.use("/weather", weatherRouter);
app.use("/about", aboutRouter);

app.use("/getWeather", getWeatherRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
