function transferPlayback(id) {
    console.log("transferPlayback called");
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
    console.log("onSpotifyWebPlaybackSDKReady called");
    const token = access_token;
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
        });
    
    console.log("adding listeners");
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        transferPlayback(device_id);
        });
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
    
    console.log("attempting connection");
    player.connect().then(success => {
        if (success) {
            console.log('The Web Playback SDK successfully connected to Spotify!');
        } else {
            console.log("FAIL");
        });
    
    document.getElementById('play-pause').onclick = function() {
        player.togglePlay();
        };
    window.PLAYER = player;
    console.log("done with OnSpotifyWebPlaybackSDKReady");
    };
