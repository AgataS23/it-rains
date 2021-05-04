console.log("HELLO I'm Agata nice to meet you  :) 🚀");

const input = document.querySelector("input");
const btn = document.querySelector("button");

const cityName = document.querySelector(".main__city-name--js");
const warning = document.querySelector(".left__warning--js");
const photo = document.querySelector(".main__photo--js");

const weather = document.querySelector(".main__weather--js");
const temperature = document.querySelector(".main__temp--js");
const temperatureMini = document.querySelector(".main__temp-mini--js");
const temperatureMax = document.querySelector(".main__temp-max--js");
const pressure = document.querySelector(".main__pressure--js");
const humidity = document.querySelector(".main__humidity--js");
const wind = document.querySelector(".main__wind--js");

const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&APPID=46054973664b5d73764aed781d9bacb8";
const units = "&units=metric";
let city;
let url;

const getWeather = () => {
  city = !input.value ? "London" : input.value;
  url = apiLink + city + apiKey + units;

  axios
    .get(url)
    .then((res) => {
      const temp = res.data.main.temp;
      const tempMin = res.data.main.temp_min;
      const tempMax = res.data.main.temp_max;
      const hum = res.data.main.humidity;
      const press = res.data.main.pressure;
      const windSpeed = res.data.wind.speed;
      const status = Object.assign({}, ...res.data.weather);

      cityName.textContent = res.data.name;
      weather.textContent = status.description;
      temperature.textContent = Math.floor(temp) + "°C";
      temperatureMini.textContent = Math.floor(tempMin) + "°C";
      temperatureMax.textContent = Math.floor(tempMax) + "°C";
      humidity.textContent = hum + " %";
      pressure.textContent = press + " hPa";
      wind.textContent = windSpeed + " m/s";
      warning.textContent = "";
      input.value = "";

      if (status.id >= 200 && status.id < 300) {
        photo.setAttribute("src", "./img/thunderstorm.png");
      } else if (status.id >= 300 && status.id < 400) {
        photo.setAttribute("src", "./img/drizzle.png");
      } else if (status.id >= 500 && status.id < 600) {
        photo.setAttribute("src", "./img/rain.png");
      } else if (status.id >= 600 && status.id < 700) {
        photo.setAttribute("src", "./img/snow.png");
      } else if (status.id >= 700 && status.id < 800) {
        photo.setAttribute("src", "./img/fog.png");
      } else if (status.id === 800) {
        photo.setAttribute("src", "./img/sun.png");
      } else if (status.id > 800 && status.id < 900) {
        photo.setAttribute("src", "./img/cloud.png");
      } else {
        photo.setAttribute("src", "./img/na.png");
      }
    })
    .catch(() => (warning.textContent = "Please enter a correct city name"));
};
const enterCheck = () => {
  if (Event.keyCode === 13) {
    getWeather();
  }
};
getWeather();
btn.addEventListener("click", getWeather);
input.addEventListener("keyup", enterCheck);
