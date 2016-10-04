var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();

var Player = mongoose.model("Player");

app.use(parser.json({urlencoded: true}));
app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));
app.use("/", express.static("node_modules"));


app.get("/api/players", function(req, res){
  Player.find().then(function(players){
    res.json(players);
  })
});

app.get("/api/players/:name", function(req, res){
  Player.findOne(req.params).then(function(player){
    res.json(player);
  })
});

app.get("/api/players/:name/shots", function(req, res){
  Player.findOne(req.params).then(function(player){
    res.json(player.shots);
  })
});


app.delete("/api/players/:name", function(req, res){
  Player.findOneAndRemove(req.params).then(function(player){
    res.json({success: true});
  });
});

app.patch("/api/players/:name", function(req, res){
  Player.findOneAndUpdate(req.params, req.body, {new: true}).then(function(player){
    res.json(player);
  });
});

app.post("/api/players", function(req, res){
  Player.create(req.body).then(function(player){
    res.json(player);
  })
});

app.post("/api/test", function(req, res){
  Player.findOneAndUpdate({name: req.body.player.name}).then(function(player){
    player.shots.push({ xCoordinate: req.body.coordinates.x,
      yCoordinate: req.body.coordinates.y,
      result: null })
      player.save(function(err){
        if(err)
        {
          console.log("error");
        }
        else {
          console.log('success');
        }
      })
      console.log(player);
    })
    console.log(req.body);
    // console.log(res);
  });




  app.get("/*", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
  });

  app.listen(3001, function(){
    console.log("sup mello mike");
  });
