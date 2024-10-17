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

function checkPlayerState() {
    player.getCurrentState().then(state => {
    if (!state) {
    console.error('User is not playing music through the Web Playback SDK');
    return;
    }
    
    var current_track = state.track_window.current_track;
    var next_track = state.track_window.next_tracks[0];
    
    console.log('Currently Playing', current_track);
    console.log('Playing Next', next_track);
    });
};

function initSpotifyPlayer() {
    log("initSpotifyPlayer", "called, current access token: " + access_token);
    const token = access_token;
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
        });
    
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
    
    player.connect().then(success => {
        if (success) {
            log("player.connect", "The Web Playback SDK successfully connected to Spotify!");
        } else {
            log("player.connect", "FAIL");
        }});
    
    document.getElementById('play-pause').onclick = function() {
        player.togglePlay();
        };
    };
