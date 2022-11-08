let activeTab;
let map = new Map();

// check if tabs changed and if it is a new tab store it in a map with a default volume of 100
    chrome.tabs.onActivated.addListener(function () {
    console.log("tab changed");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        activeTab = tabs[0].id
        console.log(activeTab)
        if (!map.has(activeTab))
        {
            map.set(activeTab, 100)
        }
    });
  });

  // give the tab volume to the popup.js
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.popupOpen) { 
      chrome.runtime.sendMessage({
        message: 'getTabVolume',
        value: map.get(activeTab)
      });
    }
  });

  // message listener for popup.js to set a tab volume
  chrome.runtime.onMessage.addListener(
    function(request) {
      if(request.message === "setTabVolume" && typeof request.value === 'number') {
            setActiveTabVolume(request.value)
      }
    }
);
  function setActiveTabVolume(volume) {
    map.set(activeTab, volume);
    console.log("success");
  }


