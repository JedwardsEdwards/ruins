// Your client id from your app in the spotify dashboard:
// https://developer.spotify.com/dashboard/applications
const client_id = '5b705282459d426f99205ec01cbc31fa';
const redirect_uri = 'https://jedwardsedwards.github.io/ruins/'; // Your redirect uri

// Restore tokens from localStorage
let access_token = localStorage.getItem('access_token') || null;
let refresh_token = localStorage.getItem('refresh_token') || null;
let expires_at = localStorage.getItem('expires_at') || null;

// References for HTML rendering
const mainPlaceholder = document.getElementById('main');

// If the user has accepted the authorize request spotify will come back to your application with the code in the response query string
// Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

let checkState = true;
let playlistId = localStorage.getItem("playlistId") || "";
let current_track = localStorage.getItem('current_track') || {id: null};

function displayHomePage() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('logout-button').style.display = 'unset';
  document.getElementById('home-page').style.display = 'unset';
  document.getElementById('home-button').style.display = 'none';
  document.getElementById('mix-page').style.display = 'none';
  document.getElementById('mix-details').style.display = 'none';
};

function displayMixPage() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('logout-button').style.display = 'unset';
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('home-button').style.display = 'unset';
  document.getElementById('mix-page').style.display = 'unset';
  document.getElementById('mix-page').style.display = 'unset';
};

function mixToHome() {
  player.pause();
  displayHomePage();
};

function homeToMix(id) {
  displayMixPage();
  setMixDetails(id);
  localStorage.setItem("playlistId", id);
  playlistId=id;
  if (typeof Spotify !== 'undefined'){
      initSpotifyPlayer();
  };
};

function homeToMixOne() {
  homeToMix("73p0zWLYMp2Rs2Kh3PM5Le");
};

document
  .getElementById('login-button')
  .addEventListener('click', redirectToSpotifyAuthorizeEndpoint, false);

document
  .getElementById('refresh-button')
  .addEventListener('click', refreshToken, false);

document
  .getElementById('logout-button')
  .addEventListener('click', logout, false);

document
  .getElementById('home-button')
  .addEventListener('click', mixToHome, false);

document
  .getElementById('mix-one-button')
  .addEventListener('click', homeToMixOne, false);

function log(sig, msg) {
  console.log(sig + "|" + msg);
};

// just set this to empty, we set up the player when we've sure log in is successful
window.onSpotifyWebPlaybackSDKReady = () => {};

function init(code) {
  log("init", "current code: " + code);
  if (code) {
    log("init", "exchanging token");
    // we have received the code from spotify and will exchange it for a access_token
    exchangeToken(code);
  } else if (access_token && refresh_token && expires_at) {
    // we are already authorized and reload our tokens from localStorage
    log("init", "current token: " + access_token);  
    getUserData();
    displayHomePage();
  } else {
    // we are not logged in so show the login button
    document.getElementById('login-page').style.display = 'unset';
  }
};

init(code);
