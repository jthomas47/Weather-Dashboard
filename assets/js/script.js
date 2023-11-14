var searchBtn = document.querySelector('#searchBtn');
var dailyWeather = document.querySelector('#dailyWeather'); 

function convertDate(dt) {
    console.log(dt); 
    var date = new Date(dt * 1000); 
    return date.toLocaleDateString("en-US"); 
}

function showWeather(resp) {
    console.log(resp);
    var city = resp.name
    var temp = resp.main.temp; 
    var wind = resp.wind.speed; 
    var humidity = resp.main.humidity; 
    var today = convertDate(resp.dt); 
    var weatherHtml = `   <h3>${city} (${today})</h3>
    <p>Temp: ${temp}&deg;F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity} %</p>`;
    console.log(weatherHtml); 

}

function getWeather() {
    var APIKey = '7179e619355c98dfb6b8db33795ab22d';
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