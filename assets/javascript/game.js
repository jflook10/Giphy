
var animals = ["hippo", "squirrel", "cow", "lemur", "panda", "puppy", "kitten", "goat", "hamster", "pig"];

$("document").ready(function(){

//dynamically adds buttons from the animals array to the page
function renderButtons(){

	//delete previous buttons to prevent duplicates
	$("#buttonsArea").empty();
	console.log("WORKING 123")

	//loop through array to create buttons
	for (i=0; i < animals.length; i++){
		var button = $("<button>").addClass("animalBtn").attr("data-name", animals[i]).text(animals[i]);
		$("#buttonsArea").append(button);
	}

	console.log("AGAIN TESTING")
}


// on click event for adding button to array and buttons on page
$("#addButton").on("click", function(event){
	console.log("Testing user click")
	//stops input button from trying to submit the input as defaulted
	event.preventDefault();

	//catches user input from form and adds it to the animals array
	var userInput = $("#buttonInput").val().trim();
	animals.push(userInput);

	renderButtons();

})





renderButtons();











});// end of document ready