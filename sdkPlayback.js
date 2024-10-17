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

function updatePlayer(track) {
    const id = track["id"];
    if (track["id"] != current_track["id"]) {
        if (expires_at < Date.now()) {
            refreshToken();
            return;
        }
        log("updatePlayer", "updating the current track details, current id:" + current_track["id"] + ", and new id: " + track["id"]);
        localStorage.setItem('current_track', track);
        current_track = track;
        document.getElementById('track-details').innerHTML = trackDetailsTemplate(current_track);
    };
};

function getMixDetails(id) {
    fetch("https://api.spotify.com/v1/playlists/" + id, {
        headers: {
        Authorization: 'Bearer ' + access_token,
        },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw await response.json();
        }
      })
      .then((data) => {
        return data;
      })
  }

function setMix(id) {
    log("setMix", "kicking off playlist");
    details = getMixDetails(id);
    fetch("https://api.spotify.com/v1/me/player/play", {
       method: "PUT",
       headers: {
         Authorization: 'Bearer ' + access_token,
       },
       body: JSON.stringify({"context_uri": "spotify:playlist:" + id})
    })
      .then(async (response) => {
        console.log(response);
        document.getElementById('mix-details').innerHTML = details.name;
        //return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
};

function setMixOne {
    const id = "73p0zWLYMp2Rs2Kh3PM5Le";
    setMix(id);
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
     document.getElementById('next-track').onclick = function() {
        player.nextTrack();
        };
     document.getElementById('previous-track').onclick = function() {
        player.previousTrack();
        };
    document.getElementById('playback-container').style.display = 'unset';
    
    window.player = player;
    };
