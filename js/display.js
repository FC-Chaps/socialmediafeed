$(".img-frame").each(function () {
    // Uncomment the following if you need to make this dynamic
    var frameH = $(this).height();
    var frameW = $(this).width();
    var frameRatio = frameW / frameH;

    var imgH = $(this).children("img").height();
    var imgW = $(this).children("img").width();
    var imgRatio = imgW / imgH;

    if (imgRatio < frameRatio) {
        $(this).addClass("portrait");
    } else {
        $(this).addClass("landscape");
    }
});