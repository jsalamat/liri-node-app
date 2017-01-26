

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
	    	console.log('-----------------------------------')
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
	    if (i == 5) titleName = titleName + process.argv[i];
	    else titleName = titleName + "+" + process.argv[i];
	    // "[space]" could work but we prefer "+" for omdapi
	}
	console.log(titleName);

	var queryUrl = "http://www.omdbapi.com/?t=" + titleName + "&y=&plot=short&r=json";
	console.log(queryUrl);

	request(queryUrl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(JSON.parse(body));
	    // If the request is successful
	  // Then log the Release Year for the movie
	    console.log(JSON.parse(body).Released);
	      //JSON.parse()
	    // the body is a string if it is  a json it is better to convert it to json
	  }
	})
}
//end of movie ----------------------------------