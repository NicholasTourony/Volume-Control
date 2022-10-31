// window.addEventListener ("load", myMain, false);

// function myMain()
// {
  let volumeControlFunction = null;

  // listener to see if popup.js called for a volume change
  // if so run the volume change function on the new value
  chrome.runtime.onMessage.addListener(
      function(request) {
        if(request.message === "set_volume_level" && typeof request.value === 'number') {
          volumeControlFunction = volumeControlFunction || setVolume()
          volumeControlFunction(request.value)
        }
      }
  );
  
  // find the video and create a gain node that can be used to
  // adjust the volume
  function setVolume() {
      console.log("looking for video");
      const video = document.querySelector('video'); // || document.querySelector('audio');
      //const video = document.getElementsByName('video');
      //const video = document.getElementById("hls-stream0");
      if (video === null)
      {
        console.log("No video elements found");
      }
      else 
      {
        console.log("video element was found");
        console.log(video);
      }
      //console.log(video);
      if (!video) {
          return undefined;
      }
  
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(video);
      const gainNode = audioContext.createGain();
  
      gainNode.gain.value = 1;
      source.connect(gainNode);
  
      gainNode.connect(audioContext.destination);
  
      return (multiplier) => {
          gainNode.gain.value = multiplier
        }
  
  }
// }

