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
     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
     
     if (!hasSetUpVolume)
     {
        chrome.scripting.executeScript({target: { tabId: tab.id },
            func: setVolume,
           });
           hasSetUpVolume = true;
     }
     else {
        chrome.scripting.executeScript({target: { tabId: tab.id },
            func: setVolume,
           });
     }
     
});

volumeUp.addEventListener("click", async () => {
    console.log('increasing volume');
    chrome.storage.sync.get("volume", (data) => {
        volume = data.volume + 10;
        chrome.storage.sync.set({volume}, function() {
            console.log("Volume set to: " + volume);
        });
        document.getElementById("VolumeText").textContent = volume; });
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
        // let audioContext = new AudioContext();
        chrome.scripting.executeScript({target: { tabId: tab.id },
        func: setVolume, 
    });
});

let source = null

function setVolume() {
    // $('#ytp-volume-panel').attr('aria-valuenow', "50");
    // console.log("Test");
        // console.log($('#ytp-volume-panel').attr('aria-valuenow'));
    // let volumeNow = document.getElementsByClassName("ytp-volume-panel")[0];
    // console.log(volumeNow);
    // console.log(volumeNow.ariaValueNow);
    // volumeNow.ariaValueNow = 50;
    // volumeNow.ariaValueNow = "50";
    // // volumeNow.setAttribute("aria-valuenow", "50");
    // document.body.style.backgroundColor = "#eb9834";
    // let volumePanel = document.querySelector('ytp-volume-panel');
    // console.log(volumePanel);
    // volumePanel.ariaValueNow = "1";
    chrome.storage.sync.get("audioObjects", (data) => {

        if (data.audioObjects[0] === null)
        {
        let audioContext = new AudioContext();
        let video = document.querySelector('video');

        let source = audioContext.createMediaElementSource(video);
        
        let gainNode = audioContext.createGain();
        console.log("Created Gain Node");
        gainNode.gain.value = gainNode.gain.value + 1.5;
        console.log("Upping gain");
        source.connect(gainNode);
    
        console.log("connected source");
        gainNode.connect(audioContext.destination);
        console.log("connected gain to destination");
        data.audioObjects[0] = source;
        console.log("setting first object to source");
        data.audioObjects[1] = audioContext;
        console.log("setting second object to source");

        const audioObjects = data.audioObjects;
        console.log(audioObjects[1]);

        chrome.storage.sync.set({audioObjects}, function() {
            console.log("set " + audioObjects);
        });

        }
        else
        {
        console.log(data.audioObjects[1]);
        let gainNode = data.audioObjects[1].createGain();
        console.log("Created Gain Node");
        gainNode.gain.value = gainNode.gain.value + 1.5;
        console.log("Upping gain");
        data.audioObjects[0].connect(gainNode);
    
        gainNode.connect(data.audioObjects[1].destination);
        }
        });
    
        // let audioContext = new AudioContext();
        // let video = document.querySelector('video');

        // let source = audioContext.createMediaElementSource(video);
        
        // let gainNode = audioContext.createGain();
        // console.log("Created Gain Node");
    

    
    
    // gainNode.gain.value = gainNode.gain.value + 1.5;
    // console.log("Upping gain");
    // source.connect(gainNode);

    // gainNode.connect(audioContext.destination);
}

function setVolumeAgain() {
    gainNode.gain.value = 5;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination)
}


// function setUpAudio() {
//     let audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     let video = document.querySelector('video');
//     let source = audioContext.createMediaElementSource(video);
    
//     let gainNode = audioContext.createGain();
// }