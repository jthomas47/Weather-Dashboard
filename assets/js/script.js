var searchBtn = document.querySelector('#searchBtn');
var dailyWeather = document.querySelector('#dailyWeather'); 
var forecast = document.querySelector('#forecast'); 
var APIKey = '7179e619355c98dfb6b8db33795ab22d';

function convertDate(dt) {
    console.log(dt); 
    var date = new Date(dt * 1000); 
    return date.toLocaleDateString("en-US"); 
}

function getForecast(lat, lon) {
console.log(lat); 
console.log(lon);
var units = 'imperial';
var lang = 'en'; 
var queryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}&lang=${lang}`;
fetch(queryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            showForecast(data); 
        })
        .catch(console.err);

}

function showForecast(resp) {
    console.log(resp); 
    forecast.innerHTML = resp.list.map((day,idx) => {
        if (idx >= 8 && idx % 8 == 0 || idx == 39) {
            console.log(convertDate(day.dt));
            
           return `<div class="col" style="width:7rem">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${convertDate(day.dt)} </h5>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png"/>
                <p class="card-text">Temp: ${day.main.temp}&deg;F</p>
                <p class="card-text">Wind: ${day.wind.speed} MPH</p>
                <p class="card-text">Humidity: ${day.main.humidity} %</p>
              </div>
            </div>
          </div>`
           
        }
    }).join(' ')

    console.log(forecast);
    
}

function showWeather(resp) {
    console.log(resp);
    var icon = resp.weather[0].icon
    var city = resp.name
    var temp = resp.main.temp; 
    var wind = resp.wind.speed; 
    var humidity = resp.main.humidity; 
    var today = convertDate(resp.dt); 
    var lat = resp.coord.lat;
    var lon = resp.coord.lon;
    getForecast(lat, lon); 
    var weatherHtml = `<h3>${city} (${today}) <img src="http://openweathermap.org/img/wn/${icon}.png"/></h3>
  
    <p>Temp: ${temp}&deg;F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity} %</p>`;
    dailyWeather.innerHTML = weatherHtml; 
    console.log(weatherHtml); 

}

function getWeather() {
    var city = 'Wichita';
    var units = 'imperial';
    var lang = 'en'; 
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=" + units + "&lang=" + lang;
    fetch(queryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            showWeather(data); 
        })
        .catch(console.err);

}

searchBtn.addEventListener('click', getWeather); 