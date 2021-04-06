var apiKey= "6b22f421ba07ca0930ed1f62044164db";
var inputCity = document.getElementById("city").value;
var lat;
var lon;
var forecastRow = document.getElementById("forecast");
var searchHistory = localStorage.getItem("cities");
var cities;

function getCurrentCity(){
    var inputCity = document.getElementById("city").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&units=imperial&appid="+apiKey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          
        console.log(data);
     
    
        console.log("city: "+ data.name);
        cityName = data.name
        var icon = data.weather[0].icon
        console.log("http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
        console.log("temperature: "+data.main.temp);
        var temp = data.main.temp
        console.log("humidity: "+data.main.humidity);
        var humidity = data.main.humidity;
        console.log("wind speed: "+data.wind.speed);
        var windSpeed = data.wind.speed;
        lat = data.coord.lat;
        console.log(lat)
        console.log("latitude: "+data.coord.lat);
        lon = data.coord.lon;
        console.log(lon)
        console.log("longitude: "+data.coord.lon)
    
    document.getElementById("currentCity").innerHTML = cityName;
    document.getElementById("currentTemp").innerHTML = "Temperature: "+temp+"°F ";
    document.getElementById("icon").src= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    document.getElementById("currentHumidity").innerHTML = "Humidity: "+humidity+"%";
    document.getElementById("ws").innerHTML = "Wind Speed: "+windSpeed+"mph";
    getForecast();
    forecastRow.setAttribute("style", "visibility: visible;");
    cities.push(cityName);
    localStorage.setItem("cities", JSON.stringify( cities ) );
    addButtons();
    })
    
    
    }
