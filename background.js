let volume = 100;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ volume });
    console.log('Default Volume set to ' + volume);
});