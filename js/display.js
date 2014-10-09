// Function that claculates the ratio of width to height of divs one to four
var imgFrames = document.getElementsByClassName('img-frame');
var i = 0;
var frameWidths = [];
var frameHeights = [];

//Width / Height = Ratio
function frameRatio(width, height) { return (width / height); }
for (i = 0; i < imgFrames.length; i++) {frameWidths[i] = imgFrames[i].clientWidth; frameHeights[i] = imgFrames[i].clientHeight; frameRatio(frameWidths[i]); }

console.log(frameHeights);
// Function that claculates the ratio of width to height of the image in divs one to four