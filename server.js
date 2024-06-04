// requires
const e = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
// setups
dotenv.config();
const app = e();
// vars
const MONGODB_URI = process.env.MONGODB_URI;

///////////////////////////
//  Controller Export
///////////////////////////
const fruitsCtrl = require("./controllers/fruits");

///////////////////////////
// Connect to Database
///////////////////////////
mongoose.connect(MONGODB_URI);
// this function will fire once a connection
// between our express and mongdv atlas is confirmed
mongoose.connection.on("connected", function () {
  console.log(`Connected to Mongodb ${mongoose.connection.name}`);
});

///////////////////////////
// Middleware
///////////////////////////
// parses form req to give us req.body
app.use(e.urlencoded({ extended: false }));
// displays HTTP reqs in console/terminal
app.use(morgan("dev"));
// method overrides
app.use(methodOverride("_method"));
// serve public files
app.use(e.static(path.join(__dirname, "public")));

///////////////////////////
// Landing Route
///////////////////////////
app.get("/", (req, res) => {
  res.render("index.ejs");
});

///////////////////////////
// Fruits Controllers
///////////////////////////

// get all fruits
app.get("/fruits", fruitsCtrl.index);

// render the new fruit page
app.get("/fruits/new", fruitsCtrl.new);

// create a new fruit
app.post("/fruits", fruitsCtrl.create);

// get fruit by id
app.get("/fruits/:id", fruitsCtrl.show);

// delete fruit
app.delete("/fruits/:id", fruitsCtrl.remove);

// show edit fruit
app.get("/fruits/:id/edit", fruitsCtrl.showEdit);

// edit fruit
app.put("/fruits/:id/edit", fruitsCtrl.edit);

app.listen(3000, () => {
  //   console.log("listening on port 3000");
});
