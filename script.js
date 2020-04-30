// Initial array of citiesArray
var citiesArray = [];

// Function for dumping the JSON content for each button into the div
function displayWeatherInfo() {
    alert("it works");

    var city = $(this).attr("data-name");
    console.log(city);
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f9476d710a0f07f0c50dc74e1e030424";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
       console.log(response);
    });
}

// Function that display creatte new buttons on search
function renderButtons() {
    $("#buttons-view").empty();
    $("#cityInput").val("");

// It gets values saved from localStorage
    // localStorage.getItem(cityName);
    var recentlySearchOnLocalStorage = localStorage.getItem("cityName");
    console.log(recentlySearchOnLocalStorage);
    citiesArray.push(recentlySearchOnLocalStorage);

// Looping through the array of citiesArray
    for ( i = 0; i < citiesArray.length; i++) {
        
// The dynamicaly generating buttons for each city in the array
        var recentlySearchList = $("<li>");
        recentlySearchList.addClass("list-group-item searchedList");
        recentlySearchList.attr("data-name", citiesArray[i]);
        recentlySearchList.text(citiesArray[i]);
// Adding buttons to the HTML document
        $("#buttons-view").append(recentlySearchList);
    }
}

//This function handles events where one button is clicked
$("#search-button").on("click", function(event) {
// event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    var cityName = $("#cityInput").val().trim();
    citiesArray.push(cityName);

// Save searched city to localStorage
    localStorage.setItem("cityName", cityName);
    if (cityName === "") {
        alert("The city name value can not be empty.")
    } else {
    renderButtons();
    }

// Function for displaying the movie info
    $(document).on("click", ".searchedList", displayWeatherInfo);
})

// Calling the renderButtons function at least once to display the inicial list of citiesArray
renderButtons();