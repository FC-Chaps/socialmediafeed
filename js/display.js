var i = 0;

function calcRatio(width, height) {
    return width / height;
}

// Get the images frames
var imgFrames = document.getElementsByClassName('img-frame');
var frameRatios = [];

// Get the images
var imgs = document.getElementsByTagName("img");
var imgRatios = [];

for (i = 0; i < imgFrames.length; i++) {
    //Calculate the Ratios first
    frameRatios[i] = calcRatio(imgFrames[i].clientWidth, imgFrames[i].clientHeight);

    imgRatios[i] = calcRatio(imgs[i].clientWidth, imgs[i].clientHeight);
    //Compare the ratios and apply corresponding class
    if (imgRatios[i] > frameRatios[i]) {
        imgs[i].classList.add("taller");
    } else if (imgRatios[i] <= frameRatios[i]) {
        imgs[i].classList.add("wider");
    }
}