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
const oauthPlaceholder = document.getElementById('oauth');

// If the user has accepted the authorize request spotify will come back to your application with the code in the response query string
// Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

let checkState = true;
let playlistId = "73p0zWLYMp2Rs2Kh3PM5Le";

if (code) {
  // we have received the code from spotify and will exchange it for a access_token
  exchangeToken(code);
} else if (access_token && refresh_token && expires_at) {
  // we are already authorized and reload our tokens from localStorage
  document.getElementById('loggedin').style.display = 'unset';

  oauthPlaceholder.innerHTML = oAuthTemplate({
    access_token,
    refresh_token,
    expires_at,
  });

  getUserData();
  // window.onSpotifyWebPlaybackSDKReady = onSpotifyWebPlaybackSDKReady
} else {
  // we are not logged in so show the login button
  document.getElementById('login').style.display = 'unset';
}

document
  .getElementById('login-button')
  .addEventListener('click', redirectToSpotifyAuthorizeEndpoint, false);

document
  .getElementById('refresh-button')
  .addEventListener('click', refreshToken, false);

document
  .getElementById('logout-button')
  .addEventListener('click', logout, false);
