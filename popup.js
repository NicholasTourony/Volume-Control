chrome.runtime.sendMessage({popupOpen: true});
// volume up and down buttons to add event listener
let volumeDown = document.getElementById("VolumeDown");
let volumeUp = document.getElementById("VolumeUp");
let mute = document.getElementById("mute");
var slider = document.getElementById("myRange");
let muted = false;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    //document.getElementById("VolumeText").textContent = this.value;
    newVolume = this.value - document.getElementById("VolumeText").textContent;
    changeVolume(newVolume);
  }

// set the text of the popup to the current volume
document.getElementById("VolumeText").textContent = 100;

// lower the volume by 10
volumeDown.addEventListener("click", async () => {
    console.log('lowering volume');
    changeVolume(-10);

});

// raise the volume by 10
volumeUp.addEventListener("click", async () => {
    console.log('increasing volume');
    changeVolume(10);
});

mute.addEventListener("click", async () => {
    console.log('muting volume');
    muteVolume();
});

// get the current tab volume when the popup is opened
chrome.runtime.onMessage.addListener(
    function(request) {
      if(request.message === "getTabVolume" && typeof request.value === 'number') {
        console.log("The current tab volume is: " + request.value);
        document.getElementById("VolumeText").textContent = request.value;
        slider.value = request.value;
      }
    });

// mute the volume of the active tab by setting volume to 0
// or get what the current volume should be if it is already muted
function muteVolume()
{
    if (!muted)
    {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {
            message: 'set_volume_level',
            value: 0
          });
        });
        muted = true;
        mute.textContent = "unmute";
    }
    else
    {
        
        volume = parseInt(document.getElementById("VolumeText").textContent);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {
            message: 'set_volume_level',
            value: volume / 100.0
          });
        });
    muted = false;
    mute.textContent = "mute";
    }
}

// take the change in volume and calculate a new volume
// store this volume and tell the content script to change the volume
function changeVolume(volume)
{
        curVolume = parseInt(document.getElementById("VolumeText").textContent);
        volume = curVolume + volume;
        if (volume < 0)
        {
            volume = 0;
        }
        else if (volume > 400)
        {
            volume = 400;
        }
        console.log("Volume set to: " + volume);
        document.getElementById("VolumeText").textContent = volume;
        slider.value = volume;

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {
            message: 'set_volume_level',
            value: volume / 100.0
          });
          console.log("setting tab volume." + volume);
          chrome.runtime.sendMessage({
            message: 'setTabVolume',
            value: volume
          });
        });
    muted = false;
    mute.textContent = "mute";
}