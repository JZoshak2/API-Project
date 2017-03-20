var topics = ["Katya", "Adore Delano", "Trixi Mattel", "Jinx Monsoon", "Kennedy Davenport", "Bob the Drag Queen"];

var gifButton = function(event) {
	event.preventDefault();
	var newTopic = $(".input").val().trim();
	topics.push(newTopic);
	buttonMaker(topics);

}

var buttonMaker = function(arr) {
	$("#button-bar").empty();
	for(i=0; i<arr.length; i++) {
		$("#button-bar").append("<button id='" + arr[i] + "'>" + arr[i] + "</button>"); 
		$("button").attr("class", "gif"); 
	}
}

var gifGetter = function() {
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id").trim() + "&api_key=dc6zaTOxFJmzC&limit=10";
	$("#gif-area").empty();
	$.ajax({
	url: queryURL,
	method: "GET"
	}).done(function(response){
		var results = response.data;
		var image;
		var div;
		console.log("hey");
		for(j = 0; j < results.length; j++) {
			image = "<image>";
			div = "<div class='gif-div' id='" + [j] + "'></div>"
			// $("#gif-area").append(image);
			$("#gif-area").append(div);
			$("#" + j).append(image);
			$("#" + j).children().attr("src", results[j].images.fixed_height_still.url).attr("data-state", "still").attr("animate",results[j].images.fixed_height.url).attr("still", results[j].images.fixed_height_still.url).attr("class", "placed-gif");
			$("#" + j).append("<p> Rating: " + results[j].rating + "</p>");
		}
		
	})
}

var gifPause = function() {
	var state = $(this).attr("data-state");
	var animate = $(this).attr("animate");
	var still = $(this).attr("still");

	if(state === "still") {
		$(this).attr("src", animate);
		$(this).attr("data-state", "active");
	}

	else {
		$(this).attr("src", still);
		$(this).attr("data-state", "still");
	}
}


$(document).on("click", ".gif", gifGetter);
$(document).on("click", "#confirm", gifButton);
$(document).on("click", ".placed-gif", gifPause);
buttonMaker(topics);