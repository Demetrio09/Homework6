var cities = [];

// Function that display creatte new buttons on search
function renderButtons() {
    $("#buttons-view").empty();
    $("#cityInput").text(" ");

// Looping through the array of cities
    for ( i = 0; i < cities.length; i++) {
        var newP = $("<p>");
        newP.addClass("list-group-item searchedCities");
        newP.attr("data-name", cities[i]);
        newP.text(cities[i]);
        $("#buttons-view").append(newP);
    }
}

//This function handles events where one button is clicked
$("#search-button").on("click", function() {
// event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();
    
    var cityName = $("#cityInput").val().trim();
    cities.push(cityName);
    renderButtons();
})