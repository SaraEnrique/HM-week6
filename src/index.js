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
currentDateTime.innerHTML = `${day} || ${hour}:${minute}`;

//---> HM WEEK 5

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
