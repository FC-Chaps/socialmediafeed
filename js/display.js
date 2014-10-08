$(".img-frame").each(function () {
    // Uncomment the following if you need to make this dynamic
    var refH = $(this).height();
    var refW = $(this).width();
    var refRatio = refW / refH;

    var imgH = $(this).children("img").height();
    var imgW = $(this).children("img").width();

    if ((imgW / imgH) < refRatio) {
        $(this).addClass("portrait");
    } else {
        $(this).addClass("landscape");
    }
});