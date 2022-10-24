This chrome extension allows the user to boost the volume further than could normally happen on a video.

To run this extension you can download the code off of github and navigate to chrome://extensions/ in your chrome browser. Once there you can turn on developer mode and then load unpacked extension. Select the file you downloaded and turn on the extension.

This extension was made in visual studio code on a laptop with a i7-9750h, 16gb of ram, and a 1660ti.

The extension consists of 4 main files
popup.html is a popup window that displays when the user clicks on the chrome extension. This file contains the buttons and the text displaying the current volume.
background.js uses Chrome's storage to storage a volume value.
popup.js controls how clicking the buttons affects the volume. When a button is clicked the new volume is calculated and storaged to chrome. This value is then passed to the content.js script to actually change the volume.
content.js finds the video element on the page and changes the volume.