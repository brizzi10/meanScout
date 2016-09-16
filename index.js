var express = require("express");
var mongoose = require("./db/connection");
var app = express();

var Player = mongoose.model("Player");

app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));

app.get("/api/players", function(req, res){
  Player.find().then(function(players){
    res.json(players);
  })
});

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3001, function(){
  console.log("sup mello mike");
});
