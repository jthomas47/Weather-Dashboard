var searchBtn = document.querySelector('#searchBtn');


function showWeather(resp) {
    console.log(resp); 
}

function getWeather() {
    var APIKey = '7179e619355c98dfb6b8db33795ab22d';
    var city = 'Wichita'
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
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