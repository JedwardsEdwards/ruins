window.onSpotifyWebPlaybackSDKReady = () => {
  const token = "BQCoV7hKMcJ0Q0I_Roy1prBEUAd6AGZqWH_6OXWQ3AnNd00IiFWbwwrU8Lc0nkOoan96HV3_cKPv3hWdQelwDjg_nFCC3aQPQ-iC4MPxLv53Ss04S5scuy7veAczpgx_glaqxQ4VTrJk8sdNb6OFN0BzTMRtH-4N7orx0i0c6JgquNlhzs0qj5Ojuo-dTFjmIjDzqQqQbW6H7lo";
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.5
  });
  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
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
