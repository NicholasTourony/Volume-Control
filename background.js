let activeTab;
let map = new Map();
     //listener for detecting tab change
    chrome.tabs.onActivated.addListener(function () {
    console.log("tab changed");
    //query about the active tab and get the tab id
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        activeTab = tabs[0].id
        console.log(activeTab)
        if (!map.has(activeTab))
        {
            map.set(activeTab, 100)
        }
    });
  });

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.popupOpen) { 
      chrome.runtime.sendMessage({
        message: 'getTabVolume',
        value: map.get(activeTab)
      });
    }
  });

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


