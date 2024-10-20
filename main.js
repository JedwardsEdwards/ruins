// TODO
// test reload from each page
// test navigate between pages
// see if we can display loading until the player is actually ready > use first update and a loaded boolean perhaps
// load the mix page after the mix has been set
// don't auto play the mix page

const client_id = '5b705282459d426f99205ec01cbc31fa';
const redirect_uri = 'https://jedwardsedwards.github.io/ruins/'; // Your redirect uri

const display_classes = ["login-element", "home-element", "mix-element", "loading-element", "play-element"];

// 1 - errors, 2 - info, 3 - debug
const log_level = 3;

// Restore tokens from localStorage
window.access_token = localStorage.getItem('access_token') || null;
window.refresh_token = localStorage.getItem('refresh_token') || null;
window.expires_at = localStorage.getItem('expires_at') || null;

window.current_page = localStorage.getItem("current_page") || "login";
window.target_page = localStorage.getItem("target_page") || null;

window.current_mix = localStorage.getItem("current_mix") || "";
window.target_mix = localStorage.getItem("target_mix") || "";
window.current_track = localStorage.getItem('current_track') || {id: null};
window.player_loaded = false;

function log(sig, msg, level) {
  if (level <= log_level) {
    if (level == 1) {
      console.err(sig + "|" + msg);
    } else {
      console.log(sig + "|" + msg);
    };
  };
};

function debug(sig, msg) {log(sig, msg, 3)};
function info(sig, msg) {log(sig, msg, 2)};
function error(sig, msg) {log(sig, msg, 1)};

function setGlobal(name, value) {
  info("setGlobal", name + " is set to " + value);
  localStorage.setItem(name, value);
  window[name] = value;
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

function setAndDisplayPage(page) {
  info("transitionToPage", "transitioning to page: " + page);
  setGlobal("current_page", page);
  displayPage(page);
};

function loadPage(page) {
  if (window.player_loaded) {
    setAndDisplayPage(page);
  } else {
    setAndDisplayPage("loading");
  };
};

function transitionToPage(page) {
  setGlobal("target_page", page);
  loadPage(page);
};

function toHome() {
  if (window.current_page == "play") {
  window.player.pause();
  };
  setAndDisplayPage("home");
};

function setMix(id) {
  setGlobal("target_mix", id);
  setMixDetails(id);
};

function toMixOne() {
  setMix("73p0zWLYMp2Rs2Kh3PM5Le");
  transitionToPage("mix");
};

document
  .getElementById('login-button')
  .addEventListener('click', redirectToSpotifyAuthorizeEndpoint, false);

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

function init() {
  info("init", "current_page: " + window.current_page + ", target_page: " + window.target_page);
  args = new URLSearchParams(window.location.search);
  code = args.get('code');
  if (code) {
    // we have received the code from spotify and will exchange it for a access_token
    exchangeToken(code);
  } else if (["home", "loading"].includes(window.current_page)) {
    initSpotifyPlayerProtected();
    displayPage(window.current_page);
  } else if (window.current_page == "mix") {
    initSpotifyPlayerProtected();
    setMix(window.target_mix);
    loadPage("mix");
  } else if (window.current_page == "play") {
    initSpotifyPlayerProtected();
    loadPage("play");
  } else {
    // we are not logged in so show the login button
    setAndDisplayPage("login");
  }
};

init();
