
var animals = ["hippo", "squirrel", "cow", "lemur", "panda", "puppy", "kitten", "goat", "hamster", "pig"];

$("document").ready(function(){

//dynamically adds buttons from the animals array to the page
function renderButtons(){

	//delete previous buttons to prevent duplicates
	$("#buttonsArea").empty();

	//loop through array to create buttons
	for (i=0; i < animals.length; i++){
		var button = $("<button>").addClass("btn btn-default animalBtn").attr("data-name", animals[i]).text(animals[i]);
		$("#buttonsArea").append(button);
	}

}


// on click event for adding button to array and buttons on page
$("#addButton").on("click", function(event){
	//stops input button from trying to submit the input as defaulted
	event.preventDefault();

	//catches user input from form and adds it to the animals array
	var userInput = $("#buttonInput").val().trim().toLowerCase();
	
	//checking for duplicate buttons
	if(animals.indexOf(userInput) === -1){
		animals.push(userInput);
		renderButtons();
	}else{
		return false};
})

// onclick of button, empty buttonsArea, add 10 videos of topic. 
$("body").on("click", ".animalBtn", function() {
    //gets name from button to include in the queryURL
    var animalName = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      animalName + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#animalText").empty().text(animalName);

    $("#gifArea").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
     })
    .done(function(response) {
        var results = response.data;
        for (var i = 0; i < 10; i++) {
 	       var gifDiv = $("<div class='item'>");

           var rating = results[i].rating;

           var p = $("<p>").text("Rating: " + rating);
           
           // prevent NSFW gifs
           if(rating === "g" || rating === "pg"){
	           var animalImg = $("<img>");
	           animalImg.attr({"src": results[i].images.fixed_height_still.url, 
	           	               "data-still": results[i].images.fixed_height_still.url,
	           	               "data-animate": results[i].images.fixed_height.url,
	           	               "data-state": "still",
	           	           	   "class": "animalGif"});
	           gifDiv.prepend(p, animalImg);

	           $("#gifArea").prepend(gifDiv);
       	    };
        }
    });
}); //end of button on-click 

$("#gifArea").on("mouseenter", ".animalGif", function(){
	$(this).attr("src", $(this).attr("data-animate"));
});

$("#gifArea").on("mouseleave", ".animalGif", function(){
	$(this).attr("src", $(this).attr("data-still"));
});



renderButtons();


});// end of document ready