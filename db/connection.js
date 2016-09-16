var mongoose = require("mongoose");

var ShotsSchema = {
  xCoordinate: Number,
  yCoordinate: Number,
  result: Boolean
}

var PlayersSchema = {
  name: String,
  number: String,
  shots: [ShotsSchema]
}

mongoose.model("Shot", ShotsSchema);

mongoose.model("Player", PlayersSchema);

mongoose.connect("mongodb://localhost/scout");

module.exports= mongoose;
