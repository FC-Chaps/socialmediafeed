var serverTools = require("./servermodule.js");

serverTools.getTwitterData("collectiveacademy");

var port = process.env.PORT || 3000;

serverTools.makeServer(port);




