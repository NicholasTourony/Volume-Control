console.log("popup is running");
let volumeDown = document.getElementById("VolumeDown");
let volumeUp = document.getElementById("VolumeUp");

chrome.storage.sync.get("volume", (data) => {
    document.getElementById("VolumeText").textContent = data.volume;
});

volumeDown.addEventListener("click", async () => {
    console.log('lowering volume');
    chrome.storage.sync.get("volume", (data) => {
        volume = data.volume - 10;
        chrome.storage.sync.set({volume}, function() {
            console.log("Volume set to: " + volume);
        });
        document.getElementById("VolumeText").textContent = volume;
     });
    
});

volumeUp.addEventListener("click", async () => {
    console.log('increasing volume');
    chrome.storage.sync.get("volume", (data) => {
        volume = data.volume + 10;
        chrome.storage.sync.set({volume}, function() {
            console.log("Volume set to: " + volume);
        });
        document.getElementById("VolumeText").textContent = volume; });

});