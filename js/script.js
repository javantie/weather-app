var searchButtonEl = document.getElementById("search-btn");
var inputField = document.querySelector("input");
var mainTempEl = document.getElementById("main-temp");
var mainWindEl = document.getElementById("main-wind");
var mainHumid = document.getElementById("main-humid");
var displayHeading = document.getElementById("display-heading");
var history = document.getElementById("history");
var hsDsp = document.getElementById("hs-dsp");
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
    });
};


// var getForcastResults = function () {
//     fetch(apiBase + city + apiKey)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//         mainTempEl.textContent = "Temp: " + data.main.temp + "° F";
//         mainWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
//         mainHumid.textContent = "Humidity: " + data.main.humidity + "%";
//         displayHeading.textContent = data.name + "☁️";
//       });
//   };


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

var getLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition();
      } else {
          alert("Nothing to show!")
      }
     
}
  getLocation()

  var showData = function(position){
      console.log(position)

  }
  console.log( coords.latitude)
