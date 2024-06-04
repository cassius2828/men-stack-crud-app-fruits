const mongoose = require("mongoose");
// vars
const MONGODB_URI = process.env.MONGODB_URI;

///////////////////////////
// Connect to Database
///////////////////////////
mongoose.connect(MONGODB_URI);
// this function will fire once a connection
// between our express and mongdv atlas is confirmed
mongoose.connection.on("connected", function () {
  console.log(`Connected to Mongodb ${mongoose.connection.name}`);
});
