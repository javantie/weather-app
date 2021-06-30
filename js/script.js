var searchButtonEl = document.getElementById("search-btn");
var inputField = document.querySelector("input");
var mainTempEl = document.getElementById("main-temp");
var mainWindEl = document.getElementById("main-wind");
var mainHumid = document.getElementById("main-humid");
var displayHeading = document.getElementById("display-heading");
var history = document.getElementById("history");
var hsDsp = document.getElementById("hs-dsp");
var forcastBlock = document.querySelector(".block");

currentCity = "wolcott";
var apiBase = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&units=imperial&appid=6260169909dd4d4630bd110c87fff970";

// Fetched Data

fetch(apiBase + currentCity + apiKey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    //Current Location Weather
    mainTempEl.textContent = "Temp: " + data.main.temp + "° F";
    mainWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
    mainHumid.textContent = "Humidity: " + data.main.humidity + "%";
    displayHeading.textContent = data.name + "☁️";
  });

//funtion to get data for API

searchButtonEl.addEventListener("click", function (event) {
  city = inputField.value;
  event.preventDefault();
  console.log(city);
  if (city === "") {
    alert("Please enter a valid city");
  } else {
    getResults();
    saveSeachData();
  }
});

var getResults = function () {
  fetch(apiBase + city + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      mainTempEl.textContent = "Temp: " + data.main.temp + "° F";
      mainWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
      mainHumid.textContent = "Humidity: " + data.main.humidity + "%";
      displayHeading.textContent = data.name + "☁️";

      oneCallApi(data.coord.lat, data.coord.lon);
    });
};
var oneCallApi = function (lat, lon) {
  var oneCallBase =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely,alerts" +
    apiKey;
  fetch(oneCallBase)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getForcastResults(data);
    });
};
///Function for setting 5 day forcast
var getForcastResults = function (data) {

  for (let i = 0; i < 4; i++) {
  var forecastDateEl = document.createElement("h3");
  var iconEl = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");
  var uvEl = document.createElement("p");
  forecastDateEl.setAttribute("class", "forcast-date");


  iconEl.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png"
  );

  forecastDateEl.textContent = "02/05/2021";
  tempEl.textContent = data.daily[i].temp.day;
  windEl.textContent = data.daily[i].wind_speed;
  humidityEl.textContent = data.daily[i].humidity;
  uvEl.textContent = data.daily[i].uvi;

  forcastBlock.append(forecastDateEl, iconEl, tempEl, windEl, humidityEl, uvEl);
}
};

var oldData = [];
//save data to local storage
var saveSeachData = function () {
  newData = {
    text: city,
  };
  oldData.push(newData);
  localStorage.setItem("search", JSON.stringify(oldData));
};

//Load data from local storage
var loadData = function () {
  oldData = JSON.parse(localStorage.getItem("search")) || [];
  console.log(oldData);
  for (let i = 0; i < oldData.length; i++) {
    console.log(oldData[i].text);
    search = document.createElement("p");
    search.setAttribute("class", "dsp");
    search.textContent = oldData[i].text;
    hsDsp.prepend(search);
  }
};

loadData();

