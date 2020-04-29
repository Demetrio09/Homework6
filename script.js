var cities = [];


// Function that display creatte new buttons on search
function renderButtons() {
// It gets values saved from localStorage
    // localStorage.getItem(cityName);
    $("#buttons-view").empty();
    $("#cityInput").empty();

// Looping through the array of cities
    for ( i = 0; i < cities.length; i++) {
        var newP = $("<li>");
        newP.addClass("list-group-item searchedCities");
        newP.attr("data-name", cities[i]);
        newP.text(cities[i]);
// Adding buttons to the HTML document
        $("#buttons-view").append(newP);
    }
}

//This function handles events where one button is clicked
$("#search-button").on("click", function(event) {
// event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();
    
    var cityName = $("#cityInput").val().trim();
    cities.push(cityName);

// Save searched city to localStorage
    localStorage.setItem(cities.length, cityName);
    renderButtons();
})

// Calling the renderButtons function at least once to display the inicial list of cities
renderButtons();