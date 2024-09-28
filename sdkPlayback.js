
function apiRequest(url, method = "GET", body = "") {
    params = {
       method: method,
       headers: {
         Authorization: 'Bearer ' + access_token,
       }
    }
    if (method != "GET") {
        params["body"] = body
    }
    fetch(url, params)
      .then(async (response) => {
        console.log(response);
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
};

function transferPlaybackold() {
  devices = apiRequest("https://api.spotify.com/v1/me/player/devices")["devices"];
  console.log(devices);
  let id = ""
  for (device in devices) {
    if (device["name"] == "Web Playback SDK Quick Start Player") {
       id = device["id"];
    };
  };
  data = {"device_ids": [id]};
  console.log(data);
  apiRequest("https://api.spotify.com/v1/me/player", "PUT", JSON.stringify(data));
};


function transferPlayback(id) {
    fetch("https://api.spotify.com/v1/me/player", {
       method: "PUT",
       headers: {
         Authorization: 'Bearer ' + access_token,
       },
       body: JSON.stringify({"device_ids": [id]})
    })
      .then(async (response) => {
        console.log(response);
        //return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
};

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = access_token;
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.5
  });
  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    transferPlayback(device_id);
  });
  
  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });
  
    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
  });
  
  player.addListener('authentication_error', ({ message }) => {
      console.error(message);
  });
  
  player.addListener('account_error', ({ message }) => {
      console.error(message);
  });
  
  player.connect();
  document.getElementById('play-pause').onclick = function() {
    player.togglePlay();
  };
};
