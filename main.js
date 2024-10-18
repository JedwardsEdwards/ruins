// TODO
// test reload from each page
// test navigate between pages
// see if we can display loading until the player is actually ready > use first update and a loaded boolean perhaps
// load the mix page after the mix has been set
// don't auto play the mix page

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

let current_page = localStorage.getItem("current_page") || "login";
let target_page = localStorage.getItem("target_page") || null;

console.log("current page: " + current_page);
console.log("target page: " + target_page);

let current_mix = localStorage.getItem("current_mix") || "";
let target_mix = localStorage.getItem("target_mix") || "";
let current_track = localStorage.getItem('current_track') || {id: null};
let player_loaded = false;

const display_classes = ["login-element", "home-element", "mix-element", "loading-element", "play-element"];

function setGlobal(name, value) {
  console.log(name + " is set to " + value);
  localStorage.setItem(name, value);
  window[name] = value;
};

function log(sig, msg) {
  console.log(sig + "|" + msg);
};

function updateClassDisplay(c, d){
  for (e of document.getElementsByClassName(c)) {
    e.style.display = d
  };
};

function hideAll() {
  for (c of display_classes){
    updateClassDisplay(c, "none");
  };
};

function displayPage(page) {
  hideAll();
  updateClassDisplay(page + "-element","unset");
};

function transitionToPage(page) {
  current_page = page;
  localStorage.setItem("current_page", page);
  displayPage(page);
};

function toHome() {
  if (current_page == "play") {
  player.pause();
  };
  transitionToPage("home");
};

function toMix() {
  setGlobal("target_page", "mix");
  if (player_loaded) {
    transitionToPage("mix");
  } else {
    transitionToPage("loading");
  };
};

function toPlay() {
  //resetPlayer();
  setGlobal("target_page", "play");
  if (player_loaded) {
    transitionToPage("play");
  } else {
    transitionToPage("loading");
  };
};

function setMix(id) {
  setGlobal("target_mix", id);
  setMixDetails(id);
};

function toMixOne() {
  setMix("73p0zWLYMp2Rs2Kh3PM5Le");
  toMix();
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
  .addEventListener('click', toHome, false);

document
  .getElementById('mix-one-button')
  .addEventListener('click', toMixOne, false);

// just set this to empty, we set up the player when we've sure log in is successful
window.onSpotifyWebPlaybackSDKReady = () => {};

function init(code) {
  log("init", "current code: " + code);
  if (code) {
    log("init", "exchanging token");
    // we have received the code from spotify and will exchange it for a access_token
    exchangeToken(code);
  } else if (["home", "loading"].includes(current_page)) {
    initSpotifyPlayerProtected();
    displayPage("home");
  } else if (current_page == "mix") {
    initSpotifyPlayerProtected();
    setMix(target_mix);
    toMix();
  } else if (current_page == "play") {
    initSpotifyPlayerProtected();
    toPlay();
  } else {
    // we are not logged in so show the login button
    transitionToPage("login");
  }
};

init(code);
