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
// IMPORT MODELS
///////////////////////////

const FruitModel = require("./models/fruit");

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
// http requests
///////////////////////////
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Read Routes
// Index Route - We want a page that we can view all the fruits

// get all fruits
app.get("/fruits", async (req, res) => {
  // go to db and get all fruits
  // display all fruits in index.ejs

  const allFruits = await FruitModel.find({});
  res.render("fruits/index.ejs", { allFruits });
});

// render the new fruit page
app.get("/fruits/new", (req, res) => {
  // res.render looks at views for template

  res.render("fruits/new.ejs");
});

// create a new fruit
app.post("/fruits", async (req, res) => {
  req.body.isReadyToEat = !!req.body.isReadyToEat;
  const fruit = await FruitModel.create(req.body);
  res.redirect("/fruits");
});

// get fruit by id
app.get("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  const selectedFruit = await FruitModel.findById(id);
  res.render("fruits/show.ejs", { selectedFruit });
});

// delete fruit
app.delete("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  const fruitToDelete = await FruitModel.deleteOne({ _id: id });
  res.redirect("/fruits");
});

// show edit fruit
app.get("/fruits/:id/edit", async (req, res) => {
  const { id } = req.params;

  const selectedFruit = await FruitModel.findById(id);

  res.render("fruits/edit.ejs", { selectedFruit });
});

// edit fruit
app.put("/fruits/:id/edit", async (req, res) => {
  const { id } = req.params;

  const selectedFruitInfo = {
    name: req.body.name,
    isFruitReadyToEat: !!req.body.isFruitReadyToEat,
  };

  await FruitModel.findByIdAndUpdate(id, selectedFruitInfo);

  res.redirect("/fruits");
});

app.listen(3000, () => {
  //   console.log("listening on port 3000");
});
