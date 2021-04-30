let dateTime = new Date();
dateTime.getDay();
dateTime.getHours();
dateTime.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dateTime.getDay()];

let hour = dateTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = dateTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDateTime = document.querySelector("#currentDateTime");
currentDateTime.innerHTML = `${day} | ${hour}:${minute}`;

//FORECAST

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <section class="futureWeather">
        <div class="forecast">
        <div class="row">
            <div class="col-2" id="forecastColumn">
              <div class="forecastDate">${formatForecastDay(
                forecastDay.dt
              )}</div>
              <img class="weekImg" src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt=""/>
              <div class="forecastTemp">
                <span class="tempMax">${Math.round(
                  forecastDay.temp.max
                )}º</span> 
                <span class="tempMin">${Math.round(
                  forecastDay.temp.min
                )}º</span>
              </div>
            </div>
           </div>
         </div>
      </section>
    
`;
    }
  });

  forecastHTML = forecastHTML + ``;
  forecastElement.innerHTML = forecastHTML;
}

// GET FORECAST

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "5cea9c14e750ffaee095052940fe6903";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//DISPLAY SEARCHED INFO
function searchLocTemp(response) {
  console.log(response.data);

  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempInput = document.querySelector("#tempNumber");
  tempInput.innerHTML = `${temperature}`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let tempMax = document.querySelector("#tempMax");
  tempMax.innerHTML = `Max: ${Math.round(response.data.main.temp_max)}º`;
  let tempMin = document.querySelector("#tempMin");
  tempMin.innerHTML = `Min: ${Math.round(response.data.main.temp_min)}º`;
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `| Wind speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;

  getForecast(response.data.coord);
}

//GET WEATHER RESULT
function searchWeatherByCity(event) {
  let city = document.querySelector("#location-input").value;
  let apiKey = "5cea9c14e750ffaee095052940fe6903";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchLocTemp);
}

//SUBMIT SEARCH
function submitLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input".value);
  searchWeatherByCity(city);
}

let form = document.querySelector("#search");
form.addEventListener("submit", submitLocation);

//WEATHER BY CURRENT LOCATION
function searchWeatherByCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5cea9c14e750ffaee095052940fe6903";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchLocTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchWeatherByCoords);
}

let locButton = document.querySelector("#searchCurrent");
locButton.addEventListener("click", getLocation);

//SWITCH CELSIUS-FAHRENHEIT
function tempFahr() {
  let city = document.querySelector("#location-input").value;
  let apiKey = "5cea9c14e750ffaee095052940fe6903";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(searchLocTemp);
}

let farhButton = document.querySelector("#fahrenheit");
farhButton.addEventListener("click", tempFahr);

function tempCel() {
  let city = document.querySelector("#location-input").value;
  let apiKey = "5cea9c14e750ffaee095052940fe6903";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchLocTemp);
}

let celButton = document.querySelector("#celsius");
celButton.addEventListener("click", tempCel);
