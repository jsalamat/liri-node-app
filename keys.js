// console.log('this is loaded');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'p7q42uVbU5n8ixGST96fxVg6h',
  consumer_secret: 'csDvM4n0EFhAR5d4v3RwibYhhgNIEyjQeYf0q3M6sxShudP6P0',
  access_token_key: '824403024688906241-D7MyvYojMXx99X52R0ETCjv4tuwyvIQ',
  access_token_secret: '2s13LSImaVP3inSAYWTwpRaAuiCJzyarXb5pAug8AuHZ0',
})

exports.t = client