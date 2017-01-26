

var importclient = require('./keys.js');
var fs = require('fs');

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

var commands = process.argv[2];
var titleName = process.argv[3];

//twitter-----------------
if (commands == "my-tweets"){
	var params = {screen_name: 'SuperJWillS'};
	importclient.t.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    // console.log(tweets[0].text);
	    for (var i = 0; i < tweets.length; i++){
	    // for (var i = 0; i < tweets.length||i < 20; i++){
	    	console.log(tweets[i].text);
	    	console.log("");
	    	console.log('------------------------------------------------------------------')
	    }
	  }
	});
}
//end of twitter------------------------

//spotify--------------------------------
if (commands == "spotify-this-song"){
	spotify.search({ type: 'track', query: titleName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } 
	    // Do something with 'data'
	    	// console.log(data);
	    	// console.log(data.tracks); 
	    	// console.log(data.tracks.items);
	    	console.log(data.tracks.items[2].artists.name);
	    	// console.log(data.tracks.items[2].name); 
	    	// console.log(data.tracks.items[2].artists); 
	});
}
//end of spotify--------------------------------

//Movie--------------------------------------
if (commands == "movie-this"){
	// Grab or assemble the movie name and store it in a variable called "titleName"
	for (var i=4; i < process.argv.length; i++){
	    if (i == 20) titleName = titleName + process.argv[i];
	    // 20 is max word of the movie title, remember it start at 4
	    else titleName = titleName + "+" + process.argv[i];
	    // "[space]" could work but we prefer "+" for omdapi
	}
	// console.log(titleName);

	var queryUrl = "http://www.omdbapi.com/?t=" + titleName + "&y=&plot=short&r=json&tomatoes=true";
	// console.log(queryUrl);
// http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&r=json&tomatoes=true
	request(queryUrl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(JSON.parse(body));
	  	console.log('------------------------------------------------------------------')
	  	console.log("Title: " + (JSON.parse(body).Title));
	    console.log("Released: " + (JSON.parse(body).Released));
	    console.log("");
	    console.log("IMDB Rating: " + (JSON.parse(body).imdbRating));
	    console.log("Country: " + (JSON.parse(body).Country));
	    console.log("Language: " + (JSON.parse(body).Language));
	    console.log("");
	    console.log("Plot: " + (JSON.parse(body).Plot));
	    console.log("Actors: " + (JSON.parse(body).Actors));
	    console.log("");
	    console.log("Rotten Tomatoes Rating: " + (JSON.parse(body).tomatoRating));
	    console.log("Rotten Tomatoes URL: " + (JSON.parse(body).tomatoURL));
	    console.log('------------------------------------------------------------------')
	  }
	})
}
//end of movie ----------------------------------