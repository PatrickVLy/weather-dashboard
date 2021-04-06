var apiKey= "6b22f421ba07ca0930ed1f62044164db";
var inputCity = document.getElementById("city").value;
var lat;
var lon;
var forecastRow = document.getElementById("forecast");
var searchHistory = localStorage.getItem("cities");
var cities;

if(searchHistory === null){
    cities = [];
}

else{cities = JSON.parse( searchHistory );}

function addButtons(){
    var buttonText = document.createTextNode(cityName);
    var form = document.getElementById("form1");
    var button = document.createElement("button");
    button.appendChild(buttonText);
    form.appendChild(button);}

function createButtons(){
    for(var i =0; i<cities.length; i++){
        function addButton(){
            var buttonText = document.createTextNode(cities[i]);
            var form = document.getElementById("form1");
            var button = document.createElement("button");
            button.appendChild(buttonText);
            button.setAttribute("value",cities[i])
            button.setAttribute("onclick", "event.preventDefault(); getButtonCity()")
            form.appendChild(button);
        
        }
            addButton();
    }
            }

            
// function getUVIndex(){
    // fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+
    // lon+"&exclude=minutely,hourly,daily,alerts&appid="+
    // apiKey)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
          
    //     console.log(data);
    // })
      
// function addButton(){
//     var button = document.createElement("button");
//     var buttonText = document.createTextNode(cit);
//     button.appendChild(buttonText);
    
//     var form = document.getElementById("form1");
//     form.appendChild(button);
// }

function getForecast(){
fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+
lon+"&exclude=current,minutely,hourly,alerts&units=imperial&appid="+
apiKey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      
    console.log(data);
    var placeholder;
    var day1 = document.getElementById("day1");
    var day2 = document.getElementById("day2");
    var day3 = document.getElementById("day3");
    var day4 = document.getElementById("day4");
    var day5 = document.getElementById("day5");
    
    var icon1 = document.getElementById("icon1");
    var icon2 = document.getElementById("icon2");
    var icon3 = document.getElementById("icon3");
    var icon4 = document.getElementById("icon4");
    var icon5 = document.getElementById("icon5");
    
    var temp1 = document.getElementById("temp1");
    var temp2 = document.getElementById("temp2");
    var temp3 = document.getElementById("temp3");
    var temp4 = document.getElementById("temp4");
    var temp5 = document.getElementById("temp5");

    var humid1 = document.getElementById("humid1");
    var humid2 = document.getElementById("humid2");
    var humid3 = document.getElementById("humid3");
    var humid4 = document.getElementById("humid4");
    var humid5 = document.getElementById("humid5");

    var dailyHumid = [placeholder, humid1, humid2, humid3, humid4, humid5];
    var dailyTemps = [placeholder, temp1, temp2, temp3, temp4, temp5];
    var icons = [placeholder, icon1, icon2, icon3, icon4, icon5];
    var days = [placeholder, day1, day2, day3, day4, day5];
    for (var i = 1; i<data.daily.length-2; i++){
    var date = moment.unix(data.daily[i].dt).format("M/D/YYYY");
    var icon = data.daily[i].weather[0].icon;
    var temp = data.daily[i].temp.day;
    var humid = data.daily[i].humidity;
console.log(date)
console.log(icon)
console.log(temp)
console.log(humid)
days[i].innerHTML= date;
icons[i].src="http://openweathermap.org/img/wn/"+icon+"@2x.png";
dailyTemps[i].innerHTML="Temp: "+temp+" °F";
dailyHumid[i].innerHTML= "Humidity: "+humid+"%";
    }
})
  

}


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




createButtons();
document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
  });
  document.getElementById("submit").addEventListener("click",getCurrentCity);

