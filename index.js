let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
let units = "metric";
let city;
let apiUrl;

function formatHours(currentDate) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return hours;
}

function formatHMinutes(currentDate) {
  let minuts = currentDate.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  return minuts;
}

function getDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentDate.getDay()];
  let hour = formatHours(currentDate);
  let minut = formatHMinutes(currentDate);
  let date = document.querySelector("#date");
  date.innerHTML = `${day} ${hour}:${minut} `;
}

function search(city){
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function searchCity(event) {
  event.preventDefault();
  let Inputcity1 = document.querySelector("#city-input");
  let Inputcity = capitalize(Inputcity1.value);
  search(Inputcity);

}

function findCity() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function capitalize(str) {
  let lower = str.toLowerCase().trim();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

function displayWeather(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${response.data.name}`;

  celsiusTemperature=response.data.main.temp;
  let tempEl = Math.round(celsiusTemperature);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let pressure = response.data.main.pressure;
  let description = response.data.weather[0].main;

  let temp = document.querySelector("#temp");
  temp.innerHTML = tempEl;

  let hum = document.querySelector("#hum");
  hum.innerHTML = `${humidity} %`;

  let windSpEl = document.querySelector("#windSp");
  windSpEl.innerHTML = `${windSpeed} m/s`;

  let pressureEl = document.querySelector("#press");
  pressureEl.innerHTML = `${pressure}`;

let iconElement = document.querySelector(".icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
let currentDesc = document.querySelector("#descr");
currentDesc.innerHTML=response.data.weather[0].description;

getForecast(response.data.coord);
}

function getTempCelc(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML =Math.round(celsiusTemperature);
linkFahr.classList.remove("deg");
linkCelc.classList.add("deg");
}

function getTempFahr(event) {
  let temp = document.querySelector("#temp");
  let currentTemp = (celsiusTemperature* 9) / 5 + 32;
  currentTemp = Math.round(currentTemp);
  temp.innerHTML = `${currentTemp}`;
 event.preventDefault();
linkCelc.classList.remove("deg");
linkFahr.classList.add("deg");

}

let currentDate = new Date();
getDate(currentDate);

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

let locButton = document.querySelector(".location_button");
locButton.addEventListener("click", findCity);

let linkCelc = document.querySelector("#celsius-temp");
let linkFahr = document.querySelector("#fahrenheit-temp");

linkCelc.addEventListener("click", getTempCelc);
linkFahr.addEventListener("click", getTempFahr);
let celsiusTemperature=null;

function formatDay(timestamp){
let date= new Date(timestamp*1000);
let day=date.getDay();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
return days[day];
}

function display_weather_forecast(response){
let forecastEl=document.querySelector("#weather-forecast");
let forecast=response.data.daily;
let forecastHTML=`<div class="row">`;
forecast.forEach(function(forecastDay,index){
if(index<6){
forecastHTML = 
          forecastHTML+ 
            `
                <div class="col-2">
                    <p class="mr_day">${formatDay(forecastDay.dt)}</p>
                    <img class="mr_emoji1" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="70px"
                        height="70 px"></img>
                    <p class="mr_temp"><span class="temp-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="temp-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span></p>
                </div>`;
}
})
forecastHTML=forecastHTML+`</div>`;
forecastEl.innerHTML=forecastHTML;
}

function getForecast(coordinates){
let apiKey1 = "b400ae3b711a616262d18b0ca2cbe78f";
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey1}&units=metric`;
axios.get(apiUrl).then(display_weather_forecast);
}

search("Kharkiv");