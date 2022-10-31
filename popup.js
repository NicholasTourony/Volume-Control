
// volume up and down buttons to add event listener
let volumeDown = document.getElementById("VolumeDown");
let volumeUp = document.getElementById("VolumeUp");
let mute = document.getElementById("mute");
let muted = false;

// set the text of the popup to the current volume
chrome.storage.sync.get("volume", (data) => {
    document.getElementById("VolumeText").textContent = data.volume;
});

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
        chrome.storage.sync.get("volume", (data) => {
            volume = data.volume;

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {
            message: 'set_volume_level',
            value: volume / 100.0
          });
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
    chrome.storage.sync.get("volume", (data) => {
        volume = data.volume + volume;
        if (volume < 0)
        {
            volume = 0;
        }
        else if (volume > 400)
        {
            volume = 400;
        }
        chrome.storage.sync.set({volume}, function() {
        console.log("Volume set to: " + volume);
    });
    document.getElementById("VolumeText").textContent = volume; 

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {
            message: 'set_volume_level',
            value: volume / 100.0
          });
        });
    });
    muted = false;
    mute.textContent = "mute";
}