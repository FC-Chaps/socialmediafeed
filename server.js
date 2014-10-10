var serverTools = require("./servermodule.js");

serverTools.getFromDB(7);

serverTools.getTwitterData("collectiveacademy");

var port = process.env.PORT || 3000;

serverTools.makeServer(port);




