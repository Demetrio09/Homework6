// Initial array of citiesArray
var citiesArray = JSON.parse(localStorage.getItem("cityName")) || [];

// setting a varible for my API key
var apiKey = "f9476d710a0f07f0c50dc74e1e030424";

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

// Function for dumping the JSON content for each button into the div
function displayWeatherInfo() {

    var city = $(this).attr("data-name");
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
       console.log(response);
    });
}

// Function to display the weather info
$(document).on("click", ".city-btn", displayWeatherInfo);
// Calling the renderButtons function at least once to display the inicial list of citiesArray
renderButtons();