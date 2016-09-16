var mongoose = require("mongoose");

var PlayersSchema = {
  name: String
}

mongoose.model("Player", PlayersSchema);

mongoose.connect("mongodb://localhost/scout");

module.exports= mongoose;
