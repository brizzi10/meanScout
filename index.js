var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();

var Player = mongoose.model("Player");

app.use(parser.json({urlencoded: true}));
app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));

app.get("/api/players", function(req, res){
  Player.find().then(function(players){
    res.json(players);
  })
});

app.post("/api/players", function(req, res){
  Player.create(req.body).then(function(player){
    res.json(player);
  })
});

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3001, function(){
  console.log("sup mello mike");
});
