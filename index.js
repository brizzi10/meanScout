var express = require("express");
var app = express();

app.get("/", function(req, res){
  res.send("__dirname" + "/public/index.html");
})

app.listen(3001, function(){
  console.log("sup mello mike");
})
