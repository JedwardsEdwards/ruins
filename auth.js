console.log("loading script")

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);

console.log(codeVerifier)

async function sha256(plain) {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)

  return window.crypto.subtle.digest('SHA-256', data)
}

function base64urlencode(a){
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const hashed = await sha256(verifyCode)
const codeChallenge = base64urlencode(hashed)

console.log(codeChallenge)

const clientId = '5b705282459d426f99205ec01cbc31fa';
const redirectUri = 'https://jedwardsedwards.github.io/ruins/home.html';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

console.log("script loaded")
