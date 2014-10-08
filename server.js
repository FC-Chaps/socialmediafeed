var serverTools = require("./servermodule.js");

console.log(serverTools.tweetStore)

serverTools.getTwitterData("collectiveacademy");

serverTools.makeServer(8000);




