var fs = requiere("fs");

var importtwitterkey = require('./keys.js');

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

//twitter-----------------
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

//end of twitter------------------------

//spotify--------------------------------
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } 
    // Do something with 'data' 
});
//end of spotify--------------------------------

//Movie--------------------------------------
// Grab or assemble the movie name and store it in a variable called "movieName"
for (var i=2; i < process.argv.length; i++){
    if (i == 2) movieName = movieName + process.argv[i];
    else movieName = movieName + "+" + process.argv[i];
    // "[space]" could work but we prefer "+" for omdapi
}
console.log(movieName);

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
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
//end of movie ----------------------------------