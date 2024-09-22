console.log("loading script")

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}



function sha256(plain) { 
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
    // Convert the ArrayBuffer to string using Uint8 array.
    // btoa takes chars from 0-255 and base64 encodes.
    // Then convert the base64 encoded to base64url encoded.
    // (replace + with -, replace / with _, trim trailing =)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function pkce_challenge_from_verifier(v) {
    hashed = await sha256(v);
    base64encoded = base64urlencode(hashed);
    return base64encoded;
}

//const hashed = sha256(codeVerifier)
const codeVerifier  = generateRandomString(64);
console.log(codeVerifier)

const codeChallenge = pkce_challenge_from_verifier(codeVerifier)

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
