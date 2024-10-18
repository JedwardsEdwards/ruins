function transferPlayback(id) {
    fetch("https://api.spotify.com/v1/me/player", {
       method: "PUT",
       headers: {
         Authorization: 'Bearer ' + access_token,
       },
       body: JSON.stringify({"device_ids": [id]})
    })
      .then(async (response) => {
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
        localStorage.setItem('current_track', track);
        current_track = track;
        document.getElementById('track-details').innerHTML = trackDetailsTemplate(current_track);
    };
};

function resetPlayer() {
    updatePlayer({"id":"","artists":[""],"name":""});
};

function setMixDetails(id) {
    fetch("https://api.spotify.com/v1/playlists/" + id + "?fields=name", {
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
        document.getElementById('mix-name').innerHTML = data.name;
        document.getElementById('mix-details').innerHTML = data.name;
      })
  }

function startMix() {
    fetch("https://api.spotify.com/v1/me/player/play", {
       method: "PUT",
       headers: {
         Authorization: 'Bearer ' + access_token,
       },
       body: JSON.stringify({"context_uri": "spotify:playlist:" + target_mix})
    })
      .then(async (response) => {
        setGlobal("current_mix", target_mix);
        //return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
};

function playPause() {
    console.log("playPause " + current_page + current_mix + target_mix + window.target_mix);
    if (current_page == "play") {
        player.togglePlay();
    } else {
        if ( target_mix != current_mix) {
            resetPlayer();
        };
        toPlay();
        if ( target_mix != current_mix) {
            startMix();
        } else {
            player.togglePlay();
        };
    };
};

function nextTrack() {
    if (current_page == "play") {
        player.nextTrack();
    }
};

function previousTrack() {
    if (current_page == "play") {
        player.previousTrack();
    }
};
    
function initSpotifyPlayer() {
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
            if (! player_loaded) {
                player_loaded = true;
            };
            if (current_page == "loading") {
                transitionToPage(window.target_page);
            };
            updatePlayer(current_track);
        });
    
    player.connect().then(success => {
        if (success) {
            log("player.connect", "The Web Playback SDK successfully connected to Spotify!");
        } else {
            log("player.connect", "FAIL");
        }});
    
    document.getElementById('play-pause').onclick = function() {
        playPause();
        };
     document.getElementById('next-track').onclick = function() {
        nextTrack();
        };
     document.getElementById('previous-track').onclick = function() {
        previousTrack();
        };
    
    window.player = player;
    };

function initSpotifyPlayerProtected() {
    window.onSpotifyWebPlaybackSDKReady = initSpotifyPlayer;
    if (typeof Spotify !== 'undefined'){
        initSpotifyPlayer();
    }
};
