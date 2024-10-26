function transferPlayback(id) {
    info("transferPlayback", "transferring playback to browser");
    fetch("https://api.spotify.com/v1/me/player", {
       method: "PUT",
       headers: {
         Authorization: 'Bearer ' + window.access_token,
       },
       body: JSON.stringify({"device_ids": [id]})
    })
      .then(async (response) => {
        toggleShuffle(false);
      })
      .catch((error) => {
        error(error);
      })
};

function toggleShuffle(on) {
    info("toggleShuffle", "updating shuffle state to on = " + on);
    fetch("https://api.spotify.com/v1/me/player/shuffle?state="+on, {
       method: "PUT",
       headers: {
         Authorization: 'Bearer ' + window.access_token,
       },
    })
      .then(async (response) => {
        //return response.json();
      })
      .catch((error) => {
        error(error);
      })
};

function updatePlayer(track) {
    if (track["id"] != window.current_track["id"]) {
        if (window.expires_at < Date.now()) {
            refreshToken();
            return;
        }
        setGlobal("current_track", track["id"]);
        document.getElementById('track-details').innerHTML = trackDetailsTemplate(track);
    };
};

function resetPlayer() {
    updatePlayer({"id":"","artists":[""],"name":""});
};

function setMixDetails(id) {
    fetch("https://api.spotify.com/v1/playlists/" + id + "?fields=name", {
        headers: {
        Authorization: 'Bearer ' + window.access_token,
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
         Authorization: 'Bearer ' + window.access_token,
       },
       body: JSON.stringify({"context_uri": "spotify:playlist:" + window.target_mix})
    })
      .then(async (response) => {
        setGlobal("current_mix", window.target_mix);
        //return response.json();
      })
      .catch((error) => {
        error(error);
      })
};

function playPause() {
    info("playPause","play/pause button hit, current_mix: " + window.current_mix + ", target_mix: " + window.target_mix);
    if (window.current_page == "play") {
        window.player.togglePlay();
    } else {
        if ( window.target_mix != window.current_mix) {
            resetPlayer();
        };
        transitionToPage("play");
        if ( window.target_mix != window.current_mix) {
            startMix();
        } else {
            window.player.togglePlay();
        };
    };
};

function nextTrack() {
    if (window.current_page == "play") {
        window.player.nextTrack();
    }
};

function previousTrack() {
    if (window.current_page == "play") {
        window.player.previousTrack();
    }
};
    
function initSpotifyPlayer() {
    const token = window.access_token;
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
        });
    
    player.addListener('ready', ({ device_id }) => {
        info("player_ready",'Ready with Device ID', device_id);
        transferPlayback(device_id);
        });
    player.addListener('not_ready', ({ device_id }) => {
        info("player_not_ready",'Device ID has gone offline', device_id);
        });
    player.addListener('initialization_error', ({ message }) => {
        error(message);
        });
    player.addListener('authentication_error', ({ message }) => {
        error(message);
        });
    player.addListener('account_error', ({ message }) => {
        error(message);
        });
    player.addListener('player_state_changed', ({
        track_window: { current_track }
            }) => {
            if (! window.player_loaded) {
                window.player_loaded = true;
            };
            if (window.current_page == "loading") {
                info("player_state_changed", "current_page: " + window.current_page + ", target_page: " + window.target_page);
                if (window.target_page == "mix") {
                  // don't love doing this here tbh
                  setMix(window.target_mix);
                };
                setAndDisplayPage(window.target_page);
            };
            window.debug_track = current_track;
            updatePlayer(current_track);
        });
    
    player.connect().then(success => {
        if (success) {
            info("player.connect", "The Web Playback SDK successfully connected to Spotify!");
        } else {
            error("player.connect", "FAIL");
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
