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
  console.log(apiUrl);  
  axios.get(apiUrl).then(showTemperature);
}

let enterForm = document.querySelector("#search-form");
enterForm.addEventListener("submit", processUserInput);

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&&exclude=hourly,minutely&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
  }

function showTemperature(response) {
  temp = Math.round(response.data.main.temp);
  var currTemp = document.querySelector("#currentTemp");
  currTemp.innerHTML = `Temperature: ${temp} °C`;
  let currPrecp = document.querySelector("#currPrecipitations");
  let iconCode = response.data.weather[0].icon;
  let icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  currPrecp.src = icon;
  let windElement = document.querySelector(`#windSpeed`);
  windElement.innerHTML = Math.round(response.data.wind.speed)+" meter/sec";
  let descriptionElement = document.querySelector(`#weatherDescription`);
  descriptionElement.innerHTML = (response.data.weather[0].description);
  console.log(response.data);
  getForecast(response.data.coord);
  }

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `Temperature: ${temp * 1.8 + 32} °F`;
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

function formatDayStamp (timestamp) {
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  return days[day];
}

function displayForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-col");
  let forecastHTML = "";

  console.log(response.data);

  forecast.forEach(function(forecastDay, index) {
    if (index < 4) {
      console.log(forecastDay);
      forecastHTML = forecastHTML + 
        `<div class="w-100"></div>
        <div class="weatherforecast card w-12% h-auto d-inline-block">
          <div class="card-body">
            <img class="futureImages" id="currPrecipitations" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">
            <h5 class="card-title">${formatDayStamp(forecastDay.dt)}</h5>
                        <p class="card-text">
              <div class="Temperature">          
              <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°C - </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°C </span>
              </div>
              <div class="precipitations">${forecastDay.weather[0].description}</div>
            </p>
          </div>
        </div>`
      }
    });
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}


