## Overview
This chrome extension allows the user to boost the volume further than could normally happen on a YouTube video.

## Features
This chrome extension provides independent volume controls over Videos on YouTube and songs on YouTube music. These volume controls go over 100% of max volume allowing you to boost the volume if needed.

## Tech Stack
This project uses JavaScript, HTML, and CSS.

## How to Use
To run this extension you can download the code off of GitHub and navigate to chrome://extensions/ in your chrome browser. Once there you can turn on developer mode and then press load unpacked extension. Select the file you downloaded and turn on the extension.

## How to Setup and Edit the Project
You can download this extension off of GitHub and open this project whatever IDE you like(I used Visual Studio Code). If you are new to Chrome extensions the documentation can be found here: https://developer.chrome.com/docs/extensions/. The documentation is categorized nicely into sections that can help if you are stuck on one area.
The extension consists of 4 main files
popup.html is a popup window that displays when the user clicks on the chrome extension. This file contains the buttons and the text displaying the current volume. 
background.js stores the active tab and uses a map to keep volumes for each tab.
popup.js controls how clicking the buttons affects the volume. When a button is clicked the new volume is calculated and storaged to the background.js map. This value is then passed to the content.js script to actually change the volume.
content.js finds the video element on the page and changes the volume by changing the gain.