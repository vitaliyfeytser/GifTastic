

// Initial array of gifs
var gifs = ["Cats", "Dogs", "Funny", "Toons"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    // This call to http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY 
    // returns 25 GIF Objects for the search term funny cat. Each GIF Object contains 
    // an Images Object containing URLs for various versions of the GIF as described in 
    // our Rendition Guide.

    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=B8fk0JOSuy0wy4G04UFNboTmVGlWQiI9&limit=10"; //ADD MY API KEY & set gif limit to 10

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $('#gif-info').text(JSON.stringify(response, null, 2));
        console.log('response', response);
        console.log('response.length', response.length);
        console.log('#gif-info', $('#gif-info'));


        for (var i = 0; i < response.data.length; i++) {
            // Creates a div to hold the gif
            var $div = $('<div>');
            console.log('response.data.length: ', response.data.length);

            // Retrieves the Rating Data
            var rating = response.data[i].rating;
            console.log('rating: ', rating);

            // Creates an element to have the rating displayed
            var $rating = $('<div>Rating: '+rating+ '</div>');
            console.log('$rating: ', $rating);

            // Displays the rating
            $div.append($rating);

            // Creates an element to hold the image
            var $img = $('<img class="still-gif">').attr('src', response.data[i].images.fixed_height_still.url);
            var $img2 = $('<img class="live-gif">').attr('src', response.data[i].images.fixed_height.url);

            // Appends the image
            $div.append($img2);
            $div.append($img);

            // Puts the entire gif above the previous gifs.
            $('#gifs-view').append($div);
            
        }
    });

}

// Function for displaying gif data
function renderButtons() {

    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        var a = $('<button type="button" class="btn btn-success"></button>');
        // Adds a class of gif to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", gifs[i]);
        // Provided the initial button text
        a.text(gifs[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGifInfo);

// Adding click event listeners to all elements with a class of "still-gif"
$(document).on("click", ".still-gif", displayLiveGif);


// Calling the renderButtons function to display the intial buttons
renderButtons();
