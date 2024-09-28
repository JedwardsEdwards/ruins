  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    console.log(IFrameAPI);
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:playlist:' + playlistId
      };
    const callback = (EmbedController) => {
        console.log(EmbedController);
        document.querySelector('#play-pause').addEventListener('click', () => {checkState = false; EmbedController.togglePlay(); checkState = true});
       
        EmbedController.addListener('playback_update', e => {
          console.log("update received from playback");
           playlistDetails();
          //document.getElementById('progressTimestamp').innerText = `${parseInt(e.data.position / 1000, 10)} s`;
        });

        checkState = true;
    };
    IFrameAPI.createController(element, options, callback);
  };
  
  function playlistDetails() {
    if (!checkState) {
      return ()};
    fetch("https://api.spotify.com/v1/me/player", {
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
        //document.getElementById('track-details').innerHTML = trackDetailsTemplate(data)
          //style.display = 'none';
        //document.getElementById('loggedin').style.display = 'unset';
        //mainPlaceholder.innerHTML = userProfileTemplate(data);
      })
      .catch((error) => {
        console.error(error);
        mainPlaceholder.innerHTML = errorTemplate(error.error);
      });
  }

  function trackDetailTemplate(data) {
    const artist = data.items[trackIndex].track.artists.name.join(", ");
    console.log(artist)
    const track = data.items[trackIndex].name;
    console.log(track)
    return `<h1>${track}</h1><h2>${artist}</h2>`;
  };
  

