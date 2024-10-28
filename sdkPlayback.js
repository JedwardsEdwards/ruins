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
        
      })
      .catch((error) => {
        error("transferPlayback", error);
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
      
        if (response.ok) {
            info("toggleShuffle", "shuffle state set");
        } else {
            info("toggleShuffle", "shuffle state not set");
        }
      })
      .catch((error) => {
          error("toggleShuffle", error);
      })
};

function updatePlayer(track) {
    if (track["id"] != window.current_track["id"]) {
        if (window.expires_at < Date.now()) {
            refreshToken();
            return;
        }
        setGlobal("current_track", track["id"]);
        document.getElementById('track-name').innerHTML= track.name.toUpperCase();
        document.getElementById('track-artist').innerHTML= track.artists.map(a => a.name).join(", ").toUpperCase();
        if (window.current_page == "play") {
          textFit(document.getElementById('track-name'));
          textFit(document.getElementById('track-artist'));
        }
    };
};

function resetPlayer() {
    updatePlayer({"id":"","artists":[""],"name":""});
};

function setMixDetails(id) {
    info("setMixDetails", "updating mix info for play/mix page");
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
        document.getElementById("mix-name").style.color = "white";
        document.getElementById('mix-name').innerHTML = data.name.toUpperCase();
        if (window.current_page == "mix") {
          textFit(document.getElementById('mix-name'));
        };
        document.getElementById("mix-name").style.color = "black";
        
        //renderMixName();
        document.getElementById('mix-details').innerHTML = data.name.toUpperCase();
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

function resetMix() {
    startMix();
    window.player.togglePlay();
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
    player.addListener('player_state_changed', (
            //{
        //track_window: { current_track }
          //  }) => {
            stateObj) => {
            console.log(stateObj);
            if (!stateObj["loading"]) {
                if (!window.player_loaded) {
                    window.player_loaded = true;
                };
                if (window.current_page == "loading") {
                    info("player_state_changed", "current_page: " + window.current_page + ", target_page: " + window.target_page);
                    if (["mix", "play"].includes(window.target_page)) {
                      // don't love doing this here tbh
                      setMix(window.target_mix);
                    };
                    setAndDisplayPage(window.target_page);
                };
                if (stateObj["shuffle"]) {
                    toggleShuffle(false)
                };
                updatePlayer(stateObj["track_window"]["current_track"]);
            };
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

    document.getElementById('reset-mix').onclick = function() {
        resetMix();
        };

    document.get    window.player = player;
    };

function initSpotifyPlayerProtected() {
    window.onSpotifyWebPlaybackSDKReady = initSpotifyPlayer;
    if (typeof Spotify !== 'undefined'){
        initSpotifyPlayer();
    }
};


function trackDetailsTemplate(data) {
    return `<h2>TRACK: ${data.name} </h2>
      <h2>ARTIST: ${data.artists.map(a => a.name).join(", ")} </h2>`;
};

