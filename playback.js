(function () {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    console.log(IFrameAPI);
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:playlist:' + playlistId
      };
    const callback = (EmbedController) => {
        console.log(EmbedController);
        document.querySelector('#play-pause').addEventListener('click', () => {EmbedController.togglePlay()});
        playlistDetails();
    };
    IFrameAPI.createController(element, options, callback);
  };
  
  function playlistDetails() {
    fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
      headers: {
        Authorization: 'Bearer ' + access_token,
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
        console.log(data);
        //document.getElementById('login').style.display = 'none';
        //document.getElementById('loggedin').style.display = 'unset';
        //mainPlaceholder.innerHTML = userProfileTemplate(data);
      })
      .catch((error) => {
        console.error(error);
        mainPlaceholder.innerHTML = errorTemplate(error.error);
      });
  }

  function trackDetailTemplate(data) {
  };
  
  const trackIndex = 0;
  const playlistId = "73p0zWLYMp2Rs2Kh3PM5Le";
  })();
