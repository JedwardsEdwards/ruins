const clientId = '5b705282459d426f99205ec01cbc31fa';
const redirectUri = 'https://jedwardsedwards.github.io/ruins/home.html';

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

console.log(urlParams)
console.log(code)

const getToken = async code => {

  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier');

  console.log(codeVerifier);
  
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response =await body.json();

  console.log(response)

  localStorage.setItem('access_token', response.access_token);
}

getToken(code)

const token = localStorage.getItem("access_token")
console.log(token)
