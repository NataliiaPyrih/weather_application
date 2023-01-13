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

function searchCity(event) {
  event.preventDefault();
  let Inputcity1 = document.querySelector("#city-input");
  let Inputcity = capitalize(Inputcity1.value);
  if (Inputcity === null) {
    city = "Kharkiv";
  } else {
    city = `${Inputcity}`;
  }
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
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

  let tempEl = Math.round(response.data.main.temp);
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

  let DescrImg = {
    Clouds: { desc: "Clouds", icon: "☁" },

    Clear: { desc: "Clear", icon: "☀" },

    Thunderstorm: { desc: "Thunderstorm", icon: "🌪" },

    Rain: {
      desc: "Rain",
      icon: "🌨"
    }
  };
  if (DescrImg[description] === undefined) {
  } else {
    let currentDesc = document.querySelector("#descr");
    currentDesc.innerHTML = `${DescrImg[description].desc}`;
    let currDescImg = document.querySelector("#currImg");
    currDescImg.innerHTML = `${DescrImg[description].icon}`;
  }

let iconElement = document.querySelector(".icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getTempCelc() {
  let temp = document.querySelector("#temp");
  temp.innerHTML = 17;
}

function getTempFahr() {
  let temp = document.querySelector("#temp");
  let currentTemp = (temp.innerHTML * 9) / 5 + 32;
  currentTemp = Math.round(currentTemp);
  temp.innerHTML = `${currentTemp}`;
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
