var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  var welcomeText = "Hoş geldiniz.";
  const date = new Date();
  var hour = date.getHours();

  if (hour >= 5 && hour <= 12) {
    welcomeText = "Günaydın, hoş geldiniz.";
  } else if (hour > 12 && hour < 18) {
    welcomeText = "Tünaydın, hoş geldiniz.";
  } else if (hour >= 18 && hour < 24) {
    welcomeText = "İyi akşamlar, hoş geldiniz.";
  }

  res.render("index", { title: "Anasayfa", welcomeText: welcomeText });
});

module.exports = router;
