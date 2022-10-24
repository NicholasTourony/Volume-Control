
// volume up and down buttons to add event listener
let volumeDown = document.getElementById("VolumeDown");
let volumeUp = document.getElementById("VolumeUp");

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
}