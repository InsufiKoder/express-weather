function getWeather() {
  var city = document.getElementById("inputCity").value;
  var cityClass = document.getElementById("inputCity").classList;
  var feedbackPopup = document.getElementById("invalidFeedback");
  if (!city) {
    cityClass.add("is-invalid");
    feedbackPopup.classList.add("d-block");
    return;
  }
  axios
    .get(`/getWeather?city=${city}`)
    .then((response) => {
      const data = response.data;
      console.log(data);
      if (data.error) {
        cityClass.add("is-invalid");
        feedbackPopup.classList.add("d-block");
        return;
      }

      if (
        cityClass.contains("is-invalid") ||
        feedbackPopup.classList.contains("d-block")
      ) {
        cityClass.remove("is-invalid");
        feedbackPopup.classList.remove("d-block");
      }
      document.getElementById("cityText").innerHTML =
        "<b>" + capitalizeLetter(city) + "</b>";
      document.getElementById(
        "humidityTemperatureText"
      ).innerHTML = `<b>Nemlilik:</b> ${data.humidity} <b>Sıcaklık:</b> ${data.temp}°C`;
      document.getElementById("descriptionText").innerHTML = capitalizeLetter(
        data.description
      );

      var weatherImage = document.getElementById("weatherImage");
      if (data.weathercode > 199 && data.weathercode < 233) {
        weatherImage.src = "images/11d@2x.svg";
      } else if (data.weathercode > 299 && data.weathercode < 322) {
        weatherImage.src = "images/09d@2x.svg";
      } else if (data.weathercode > 499 && data.weathercode < 532) {
        weatherImage.src = "images/10d@2x.svg";
      } else if (data.weathercode > 599 && data.weathercode < 623) {
        weatherImage.src = "images/13d@2x.svg";
      } else if (data.weathercode > 700 && data.weathercode < 782) {
        weatherImage.src = "images/50d@2x.svg";
      } else if (data.weathercode == 800) {
        weatherImage.src = "images/01d@2x.svg";
      } else if (data.weathercode == 801) {
        weatherImage.src = "images/02d@2x.svg";
      } else if (data.weathercode == 802) {
        weatherImage.src = "images/03d@2x.svg";
      } else if (data.weathercode == 803 || data.weathercode == 804) {
        weatherImage.src = "images/04d@2x.svg";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function capitalizeLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
