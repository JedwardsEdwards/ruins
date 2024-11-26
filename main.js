// TODO

// functions
// auto log out after a period of timee

// styles
// test out fonts
// mix color palettes
// welcome page
// animated text loading
// Layout was forced before the page was fully loaded. If stylesheets are not yet loaded this may cause a flash of unstyled content.

// testing
// reload from each page
// navigate between pages

const client_id = '5b705282459d426f99205ec01cbc31fa';
const redirect_uri = 'https://jedwardsedwards.github.io/ruins/'; // Your redirect uri

const display_classes = ["login-element", "home-element", "mix-element", "loading-element", "play-element"];

const allowed_mixes = {
  "test" : "73p0zWLYMp2Rs2Kh3PM5Le",
  "slimy" : "5MrDj4GwlY8WBRNzVHtE6Y",
  "rancid" : "5zKYErTXVpyRj9LGDP0RX0"
};

function getMixFromId(id) {
  return Object.keys(allowed_mixes).find(key => allowed_mixes[key] == id); 
};

// 1 - errors, 2 - info, 3 - debug
const log_level = 3;

const display_palettes = {
  "default" : {
    "color" : "black",
    "background-color" : "white",
    "highlight-color" : "white",
    "hover" : "#dddddd"
  },
  "slimy" : {
    "color" : "#4AC176",
    "background-color" : "#191C1A",
    "highlight-color" : "#0BEA5E",
    "hover" : "#1E2C26"
  },
  "rancid" : {
    "color" : "#815555",
    "background-color" : "#272222",
    "highlight-color" : "#FF3333",
    "hover" : "#402B2B"
  }};

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
      console.error(sig + "|" + msg);
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

function buttonMouseDown(event) {
  event.target.style["background-color"]  = display_palettes[getMixFromId(window.target_mix) || "default"]["highlight-color"]
};
function buttonMouseUp(event) {
  event.target.style["background-color"]  = display_palettes[getMixFromId(window.target_mix) || "default"]["background-color"]
};
function buttonMouseEnter(event) {
  event.target.style["background-color"]  = display_palettes[getMixFromId(window.target_mix) || "default"]["hover"]
};
function buttonMouseLeave(event) {
  event.target.style["background-color"]  = display_palettes[getMixFromId(window.target_mix) || "default"]["background-color"]
};

function setPalette(name, hide) {
  info("setPalette", "name is: " + name);
  document.getElementById("banner-logo").src = "ruins_logo_name_smaller" + name + ".png";
  document.getElementById("loading-logo").src = "ruins_logo_small_" + name + ".png";
  document.getElementsByTagName("html")["0"].style["color"] = display_palettes[name]["color"];
  document.getElementsByTagName("html")["0"].style["background-color"] = display_palettes[name]["background-color"];
  document.querySelectorAll(".button").forEach(b => {
    b.style["background-color"] = display_palettes[name]["background-color"];
  });
  if (hide) {
    document.querySelectorAll(".page").forEach(p => p.style.color = display_palettes[name]["background-color"]);
  };
};
  
function displayPage(page) {
  hideAll();
  if (page == "home") {
    hide = false;
  } else {
    hide = true;
  };
  setPalette(getMixFromId(window.target_mix) || "default", hide);
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

function toHome(event) {
  setGlobal("target_mix", "");
  if (window.current_page == "play") {
  window.player.pause();
  };
  setAndDisplayPage("home");
};

function setMix(id) {
  setGlobal("target_mix", id);
  setMixDetails(id);
};

function toMixOne(event) {
  setGlobal("target_mix", allowed_mixes["slimy"]);
  if (window.player_loaded) {
    setMixDetails(allowed_mixes["slimy"]);
  } 
  //setAndDisplayPage("mix");
  transitionToPage("mix");
};

function toMixTwo(event) {
  setGlobal("target_mix", allowed_mixes["rancid"]);
  if (window.player_loaded) {
    setMixDetails(allowed_mixes["rancid"]);
  } 
  //setAndDisplayPage("mix");
  transitionToPage("mix");
};

function toPlay(event) {
    info("toPlay","current_mix: " + window.current_mix + ", target_mix: " + window.target_mix);
    // all the stuff commented out here was for persisting the mix between moving to home and back, but bugs with already playing stuff, so this is cleaner for now
    // can always hack it from the phone
    //if ( window.target_mix != window.current_mix) {
    //    resetPlayer();
    //};
    transitionToPage("play");
    startMix();
    //if ( window.target_mix != window.current_mix) {
    //    startMix();
    //} else {
    //    window.player.togglePlay();
    //};
};

function initPlayerPage() {
  if (["home", "loading"].includes(window.current_page)) {
    initSpotifyPlayerProtected();
    displayPage(window.current_page);
  } else if (window.current_page == "mix") {
    initSpotifyPlayerProtected();
    setMix(window.target_mix);
    displayPage("mix");
  } else if (window.current_page == "play") {
    initSpotifyPlayerProtected();
    loadPage("play");
  };
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

document
  .getElementById('mix-two-button')
  .addEventListener('click', toMixTwo, false);

document
  .getElementById('start-mix-button')
  .addEventListener('click', toPlay, false);

document.querySelectorAll(".button").forEach(b => {
  b.addEventListener("mouseenter", buttonMouseEnter, false);
  b.addEventListener("mouseleave", buttonMouseLeave, false);
  b.addEventListener("mousedown", buttonMouseDown, false);
  b.addEventListener("mouseup", buttonMouseUp, false)
});

// just set this to empty, we set up the player when we've sure log in is successful
window.onSpotifyWebPlaybackSDKReady = () => {};

function init() {
  info("init", "current_page: " + window.current_page + ", target_page: " + window.target_page);
  args = new URLSearchParams(window.location.search);
  code = args.get('code');

  if (code) {
    // we have received the code from spotify and will exchange it for a access_token
    exchangeToken(code);
  } else if (["home", "loading", "mix", "play"].includes(window.current_page)) {
     if (window.expires_at < Date.now()) {
      refreshToken();
      } else {
       initPlayerPage()
     };
  } else {
    // we are not logged in so show the login button
    setAndDisplayPage("login");
  }
};

init();
