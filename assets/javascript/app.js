// Initial Array of Animals
var animals = ["Pangolin", "Axolotl", "Amur Leopard", "Superb Bird of Paradise", "Siberian Husky", "Platypus", "Narwhals", "Dumbo Octopus"];
var animal;

// Creates Initial buttons and future buttons out of string items within the Animals Array //
//--------------------------------------//
function renderButtons() 
{
  $("#animal-buttons").empty();

  // Looping through the array of movies
  for (var i = 0; i < animals.length; i++) 
  {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("animals");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-animal", animals[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#animal-buttons").append(a);
  }
}

// Adds Animals into array thru submit form //
//--------------------------------------//
$("#add-animal").on("click", function(event)
{
  event.preventDefault();
  // This line will grab the text from the input box
  animal = $("#animal-input").val().trim();
  // The animal from the textbox is then added to our array
  animals.push(animal);
  // calling renderButtons which handles the processing of our animal array
  renderButtons();

  $(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state")

    console.log(state);
    if (state === "still") {

        // Change the src attribute and the data attribute.
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }


});
});


// Function incharge of taking button input onClick and 'GET'ting all that GIF Goodness //
//--------------------------------------//

$('body').on('click', '.animals', function()
{
  $(".gifContainer").empty();

  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
  url: queryURL,
  method: "GET"
  })
  .then(function(response)
  {
    console.log(queryURL);
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++)
    {
      var animalDiv = $("<div class = 'animalDiv'>")
      var p = $("<p>").text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.addClass("gif");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still")
      animalImage.attr("data-still", response.data[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", response.data[i].images.fixed_height.url);
      animalDiv.append(p);
      animalDiv.append(animalImage);

      $(".gifContainer").prepend(animalDiv);

    }
  });

});

$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state")

  console.log(state);
  if (state === "still") {

      // Change the src attribute and the data attribute.
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

  } else {

      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still")
  }


});


renderButtons();