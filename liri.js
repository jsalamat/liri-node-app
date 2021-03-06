

var importclient = require('./keys.js');
var fs = require('fs');

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

var commands = process.argv[2];
var titleName = process.argv[3];

switch (commands) {
        case "my-tweets":
            liritweets();
            break;
        case "spotify-this-song":
            lirispotify();
            break;
        case "movie-this":
            lirimovie();
            break;
        case "do-what-it-says":
            lirisays();
            break;
        default:
        	console.log("");
        	console.log('------------------------------------------------------------------');
            console.log('invalid entry, Please put right command after: node liri.js');
            console.log('------------------------------------------------------------------');
            console.log('choices are:');
            console.log('	my-tweets');
            console.log('	spotify-this-song <artist or song>');
            console.log('	movie-this <movie title>');
            console.log('	do-what-it-says');
            console.log('------------------------------------------------------------------');

}

//twitter-----------------
function liritweets() {
	var params = {screen_name: 'SuperJWillS'};
	importclient.t.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    // console.log(tweets[0].text);
	    for (var i = 0; i < tweets.length; i++){
	    // for (var i = 0; i < tweets.length||i < 20; i++){
		    var tweetlog =
		    	'------------------------------------------------------------------'+'\r\n'+
		    	"" +'\r\n'+
		    	"Date: " + tweets[i].created_at +'\r\n'+
		    	"Tweets: " + tweets[i].text +'\r\n'+
		    	"" +'\r\n'+
		    	'------------------------------------------------------------------';
		    	console.log(tweetlog);
		    	lirilog(tweetlog);
	    }
	  }
	});
}
//end of twitter------------------------

//spotify--------------------------------
function lirispotify() {
	if (!titleName){
		titleName = "Ace of Base";
	}
	for (var i=4; i < process.argv.length; i++){
	    if (i == 20) titleName = titleName + process.argv[i];
	    // 20 is max word of the movie title, remember it start at 4
	    else titleName = titleName + "+" + process.argv[i];
	    // "[space]" could work but we prefer "+" for omdapi
	}
	spotify.search({ type: 'track', query: titleName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } 
	    	// console.log(data);
	    	// console.log(JSON.stringify(data.tracks, null, 2)); 
	    for (var i = 0; i < 20; i++){
	    	var spotifylog =
	    		'------------------------------------------------------------------'+'\r\n'+
		    	"" +'\r\n'+
		    	"Artist(s): " + data.tracks.items[i].artists[0].name +'\r\n'+
		    	"Song\'s Name: " + data.tracks.items[i].name +'\r\n'+
		    	"Preview Link: " + data.tracks.items[i].preview_url +'\r\n'+
		    	"Album: " + data.tracks.items[i].album.name +'\r\n'+
		    	"" +'\r\n'+
		    	'------------------------------------------------------------------' ;
		    console.log(spotifylog);
		    lirilog(spotifylog);
	    } 
	});
}
//end of spotify--------------------------------

//Movie--------------------------------------
function lirimovie() {
	if (!titleName){
		titleName = "Mr Nobody";
	}
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
	    var movielog =
			  	'------------------------------------------------------------------' +'\r\n'+
			  	"" +'\r\n'+
			  	"Title: " + (JSON.parse(body).Title) +'\r\n'+
			    "Released: " + (JSON.parse(body).Released) +'\r\n'+
			    "" +'\r\n'+
			    "IMDB Rating: " + (JSON.parse(body).imdbRating) +'\r\n'+
			    "Country: " + (JSON.parse(body).Country) +'\r\n'+
			    "Language: " + (JSON.parse(body).Language) +'\r\n'+
			    "" +'\r\n'+
			    "Plot: " + (JSON.parse(body).Plot) +'\r\n'+
			    "Actors: " + (JSON.parse(body).Actors) +'\r\n'+
			    "" +'\r\n'+
			    "Rotten Tomatoes Rating: " + (JSON.parse(body).tomatoRating) +'\r\n'+
			    "Rotten Tomatoes URL: " + (JSON.parse(body).tomatoURL) +'\r\n'+
			    "" +'\r\n'+
			    '------------------------------------------------------------------' ;
		console.log(movielog);
		    lirilog(movielog);
	  }
	})
}
//end of movie ----------------------------------


//fs command do-what-it-says--------------------------------------
function lirisays(){
	fs.readFile('random.txt', {encoding: 'utf-8'},  function(err, data) {
			// console.log(data);
			var output = data.split(",");
			// console.log(output);
			// console.log(output[0]);
			// console.log(output[1]);
			commands = output[0];
			console.log("Random Command: " +commands);
			titleName = output[1];
			console.log("Random Title: " +titleName);
			if(commands == 'my-tweets'){
				liritweets();
			}
			if(commands == 'spotify-this-song'){
				lirispotify();
			}
			if(commands == 'movie-this'){
				lirimovie();
			} else {
				console.log("Wrong commands")
			}		
	});
}
//end of fs command do-what-it-says ----------------------------------

//log function --------------------------------------------------------
function lirilog(a){
	fs.appendFile("log.txt", a, function(err) {
	  // If an error was experienced we say it.
	  if (err) {
	    console.log(err);
	  }
	});
}
//end log function ----------------- ----------------------------------