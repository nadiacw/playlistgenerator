var request = require('request'); // "Request" library

  var client_id = '6892496b8fd94e9d9da1cd43974cffca'; // Your client id
  var client_secret = '4d2ad3b358fd4680a3c1caf689f81668'; // Your secret

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/' + user_id + + '/playlists',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'name': 'A new Playlist',
          'public': 'false'
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  });