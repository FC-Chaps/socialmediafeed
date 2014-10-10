var serverTools = require("./servermodule2.js");
serverTools.getFromDB(7);
//This needs to be called ON REQUEST!
serverTools.getTwitterData("collectiveacademy");

var port = process.env.PORT || 3000;

serverTools.makeServer(port);




