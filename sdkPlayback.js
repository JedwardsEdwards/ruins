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

function updatePlayer(current_track) {
    const id = current_track["id"];
    if (id != current_id) {
        log("updatePlayer", "updating the current track details, current id:" + current_id + ", and new id: " + id);
        localStorage.setItem('current_id', id);
        // TODO - delete this
        window.TRACK = current_track;
        document.getElementById('track-details').innerHTML = trackDetailsTemplate(current_track);
    };
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
    player.addListener('player_state_changed', ({
        track_window: { current_track }
            }) => {
            updatePlayer(current_track);
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
    document.getElementById('playback-container').style.display = 'unset';
    
    window.player = player;
    };
