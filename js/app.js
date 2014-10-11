function main () {

	getContent("http://chaps-server.herokuapp.com/");	

}

function getContent (url) {

	$.ajax({
		url: url,
		success: function (data) {
			putInObjects(JSON.parse(data));
		}
	});

}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

function putInObjects (data) {
	var counter = 0;
	var objectified = {};
	var property;
	data.forEach(function (tweet) {
		counter += 1;
		property = "tweet" + counter;
		objectified[property] = tweet;
	});
	constructContent(objectified);
}

function constructContent (object) {
	var content = "";
	Object.keys(object).forEach(function (key) {
		switch (key) {
			case "tweet1":
				content += '<div class="row firstrow">' +
					'<div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-0 post" id="post1">' +
					'<div class="col-md-8 img-frame"><p class="username"><a href="#" class="user">' +
					object[key].username + '</a></p><a href="' + object[key].image +
					'" class="thetweet" target="_blank"><img src="' + object[key].image + 
					'"></a></div><div class="col-md-4 text-wrapper"><p class="tweet-text">' + 
					object[key].body + '</p><p class="date">' + timeSince(object[key].date) + '</p></div></div>';
				break;
			case "tweet2":
				content += '<div class="col-xs-10 col-xs-offset-1 col-md-5 col-md-offset-1 post" id="post2">' +
                	'<div class="col-xs-12 img-frame"><p class="username"><a href="#" class="user">' + 
                	object[key].username + '</a></p><a href="' + object[key].image + '" class="thetweet"' +
                	' target="_blank"><img src="' + object[key].image + '"></a></div><div class="col-xs-12' + 
                	' text-wrapper"><p class="tweet-text">' + object[key].body + '</p><p class="date">' + 
                	timeSince(object[key].date) + '</p></div></div></div>';
                break;
            case "tweet3":
            	content += '<div class="row secondrow"><div class="col-xs-10 col-xs-offset-1 col-md-6' + 
            		' col-md-offset-0 post" id="post3"><div class="col-md-8 col-md-push-4 img-frame">' + 
            		'<p class="username"><a href="#" class="user">' + object[key].username + '</a></p>' + 
            		'<a href="' + object[key].image + '" class="thetweet" target="_blank"><img src="' + 
            		object[key].image + '"></a></div><div class="col-md-4 col-md-pull-8' +
            		' text-wrapper"><p class="tweet-text">' + object[key].body + '</p><p class="date">' + 
            		timeSince(object[key].date) + '</p></div></div></div>';
            	break;
            case "tweet4":
            	content += '<div class="row thirdrow"><div class="col-md-6"><div class="col-xs-10' + 
            		' col-xs-offset-1 col-md-11 col-md-offset-0 post" id="post4"><div class="col-xs-12' + 
            		' img-frame"><p class="username"><a href="#" class="user">' + object[key].username + 
            		'</a></p><a href="' + object[key].image + '" class="thetweet" target="_blank">' +
            		'<img src="' + object[key].image + '" class=""></a></div><div class="col-xs-12' +
            		' text-wrapper"><p class="tweet-text">' + object[key].body + '</p><p class="date">' +
            		timeSince(object[key].date) + '</p></div></div></div>';
            	break;
            case "tweet5":
            	content += '<div class="col-md-6"><div class="col-xs-10 col-xs-offset-1 col-md-11' +
            		' col-md-offset-1 post" id="post5"><div class="col-xs-12 img-frame"><p class="username">' +
            		'<a href="#" class="user">' + object[key].username + '</a></p><a href="' + object[key].image +
            		'" class="thetweet" target="_blank"><img src="' + object[key].image +'" class=""></a>' +
            		'</div><div class="col-xs-12 text-wrapper"><p class="tweet-text">' + object[key].body + 
            		'</p><p class="date">' + timeSince(object[key].date) + '</p></div></div></div></div>'
		}
	
	})

	injectContent(content);
}

function injectContent (content) {
	$(".container").append(content);
}

$(document).ready(main);
