  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    console.log(IFrameAPI);
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:playlist:' + playlistId
      };
    const callback = (EmbedController) => {
        console.log(EmbedController);
        document.querySelector('#play-pause').addEventListener('click', () => {EmbedController.togglePlay()});
    };
    IFrameAPI.createController(element, options, callback);
  };
