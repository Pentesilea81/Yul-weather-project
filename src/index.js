let apiKey = "7cdee6b4b8c49eb211278747bdf4efe8";

let now = new Date();
let todayTime = document.querySelector("#today-time");
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let hour = now.getHours();
let minutes = now.getMinutes();
let weekday = weekdays[now.getDay()];

minutes = `${minutes}`.padStart(2, "0");
hour = `${hour}`.padStart(2, "0");
todayTime.innerHTML = `${weekday}, ${hour}:${minutes}`;

var temp;
var wind;

function processUserInput(event) {
  event.preventDefault();
  let cityname = document.querySelector("#cityname");
  let inputValue = document.querySelector(".js-userinput").value;
  cityname.innerHTML = inputValue;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let enterForm = document.querySelector("#search-form");
enterForm.addEventListener("submit", processUserInput);

function showTemperature(response) {
  temp = Math.round(response.data.main.temp);
  var currTemp = document.querySelector("#currentTemp");
  currTemp.innerHTML = `Temperature: ${temp} °C`;
  let currPrecp = document.querySelector("#currPrecipitations");
  let iconCode = response.data.weather[0].icon;
  let icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  currPrecp.src = icon;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `Temperature: ${temp * 1.8 + 32} °C`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `Temperature: ${temp} °C`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
