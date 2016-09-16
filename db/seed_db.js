var mongoose = require("./connection");
var seedData = require("./seeds");

var Player = mongoose.model("Player");

Player.remove().then(function(){
  Player.create(seedData).then(function(){
    process.exit();
  });
})
