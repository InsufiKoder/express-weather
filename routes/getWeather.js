var express = require("express");
var router = express.Router();
var weather = require("openweather-apis");

router.get("/", function (req, res) {
  const city = req.query.city;
  weather.setCity(city);

  weather.getSmartJSON(function (err, smart) {
    if (err) {
      console.error("Error fetching weather data:", err);
      res.status(500).json({ error: "Error fetching weather data" });
    } else {
      res.json(smart);
    }
  });
});

module.exports = router;
