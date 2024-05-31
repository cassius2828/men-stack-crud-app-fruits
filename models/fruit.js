const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

/*
Creates our fruits collection in mongodv
Returns an obj we are exporting as Fruit,
which has all the CRUD methods attached to it
*/
const FruitModel = mongoose.model("Fruit", fruitSchema);

module.exports = FruitModel;
