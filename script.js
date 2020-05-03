// Initial array of citiesArray
var citiesArray = JSON.parse(localStorage.getItem("cityName")) || [];

// setting a varible for my API key
var apiKey = "f9476d710a0f07f0c50dc74e1e030424";

// creat a arible for date
var utcDate = new Date();
var monthDayYear = utcDate.toLocaleDateString();
console.log(monthDayYear);

// Function that display creatte new buttons on search
function renderButtons() {
    $("#buttons-view").empty();
    $("#cityInput").val("");

    // Looping through the array of citiesArray
    for ( i = 0; i < citiesArray.length; i++) {
    // The dynamicaly generating buttons for each city in the array
        var cityBtn = $("<button>");
        cityBtn.addClass("list-group-item city-btn");
        cityBtn.attr("data-name", citiesArray[i]);
        cityBtn.text(citiesArray[i]);
        $("#buttons-view").append(cityBtn);
    }
    var cityBtnValeu = $(".city-btn").attr("data-name");
    var cityEl = $("<h1>");
    cityEl.text(cityBtnValeu);
    $("#current-weather").append(cityEl);
}

//This function handles events where one button is clicked
$("#search-button").on("click", function(event) {

// event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    var cityName = $("#cityInput").val().trim();

    if (cityName) {
        // Save searched city to localStorage
        citiesArray.push(cityName);
        localStorage.setItem("cityName", JSON.stringify(citiesArray));
        renderButtons();
    }
})

// function to empty out the city name on main h1
function clear() {
    $("#current-weather").empty();
}

// Function for dumping the JSON content for each button into the div
function displayWeatherInfo() {

    var city = $(this).attr("data-name");
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    // Calling the function to empty the main h1 in order to show new one
    clear();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
       console.log(response);
        var apiCityName = response.name;
        var apiTemperature = (response.main.temp - 273.15) * 9/5 + 32;
        var temperature = apiTemperature.toFixed(2) + " °F";
        var apiFeelsLike = (response.main.feels_like - 273.15) * 9/5 + 32;
        var feelsLike = apiFeelsLike.toFixed(2) + " °F";
        var apiHumidity = response.main.humidity + " %";
        var apiWindSpeed = response.wind.speed * 2.237;
        var windSpeed = apiWindSpeed.toFixed(1) + " MPH";
        var apiLatitude = response.coord.lat;
        var apiLongitude = response.coord.lon;
        console.log(apiCityName, apiTemperature, apiHumidity, apiWindSpeed, apiLatitude, apiLongitude, temperature, feelsLike, windSpeed);
       apiUvIndex();
       forecast();
        var cityEl = $("<h1>");
        var tempetureEl = $("<h5>");
        var humidityEl = $("<h5>");
        var windSpeedEl = $("<h5>");
        var dateEl = $("<h5>");
        cityEl.addClass("");
        cityEl.attr("data-name");
        cityEl.text(apiCityName);
        dateEl.text(monthDayYear);
        tempetureEl.text("Temperature: " + temperature);
        humidityEl.text("Humidity: " + apiHumidity);
        windSpeedEl.text("Wind speed: " + windSpeed);
        // uvIndexEl.text(apiUvIndex);
        // forecastEl.text(forecast);
        $("#current-weather").append(cityEl);
        $("#current-weather").append(dateEl);
        $("#current-weather").append(tempetureEl);
        $("#current-weather").append(humidityEl);
        $("#current-weather").append(windSpeedEl);

        function apiUvIndex() {
            var queryURLIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + apiLatitude +"&lon=" + apiLongitude;

            $.ajax({
                url: queryURLIndex,
                method: "GET"
            }).then(function(uvIndexResponse) {
                var uvIndexValue = uvIndexResponse.value;
                console.log (uvIndexValue);
                var uvIndexEl = $("<div>");
                var uvIndexP = $("<h5>");
                var backGround = $("<h5>");
                uvIndexEl.addClass("index-p");
                uvIndexP.text("UV Index:");
                backGround.text(uvIndexValue);
                $("#current-weather").append(uvIndexEl);
                $(".index-p").append(uvIndexP);
                $(".index-p").append(backGround);
                
            if (uvIndexValue < 4) {
                backGround.addClass("alert alert-success");
            } if (uvIndexValue <= 6) {
                backGround.addClass("alert alert-warning");
            } else {
                backGround.addClass("alert alert-danger");
            }
        })
        };
        function forecast() {
            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function(forecastResponse) {
                console.log(forecastResponse)
                for (var i = 0; i < 5; i++) {
                    // const element = 5[i];
                var apiTempForecast = (forecastResponse.list[2 + i + 8].main.temp - 273.15) * 9/5 + 32;
                var apiHumForecast = forecastResponse.list[2 + i + 8].main.humidity + "%";
                console.log(apiTempForecast, apiHumForecast);
                var tempForecast = apiTempForecast.toFixed(2) + " °F";
                var dateForecast = utcDate.setDate(utcDate.getDate() + 1);
                var dateForEl = $("#date" + [i]);
                var tempForEl = $("#temp" + [i]);
                var humidityForEl = $("<p>");
                dateForEl.text(dateForecast);
                tempForEl.text("Temperature: " + tempForecast);
                humidityForEl.text("Humidity: " + apiHumForecast);
                $("#forecast" + [i]).append(humidityForEl);
                }
                
        })
        }    
    })
}

// Function to display the weather info
$(document).on("click", ".city-btn", displayWeatherInfo);
// Calling the renderButtons function at least once to display the inicial list of citiesArray
renderButtons();