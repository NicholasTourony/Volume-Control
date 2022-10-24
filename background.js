// default volume of 100%
let volume = 100;

// use chrome's storage to save this value
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ volume });
    console.log('Default Volume set to ' + volume);
});

