// requires
const e = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

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
//   console.log(`Connected to Mongodb ${mongoose.connection.name}`);
});

///////////////////////////
// Middleware
///////////////////////////
// parses form req to give us req.body
app.use(e.urlencoded({ extended: false }));
// displays HTTP reqs in console/terminal
app.use(morgan("dev"));


///////////////////////////
// http requests
///////////////////////////
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Read Routes
// Index Route - We want a page that we can view all the fruits

app.get("/fruits", async (req, res) => {
  // go to db and get all fruits
  // display all fruits in index.ejs

  const allFruits = await FruitModel.find({});
  console.log(allFruits);
  res.render("fruits/index.ejs", { allFruits });
});

app.get("/fruits/new", (req, res) => {
  // res.render looks at views for template
  res.render("fruits/new.ejs");
});

app.post("/fruits", async (req, res) => {
  //   if (req.body.isReadyToEat) {
  //     req.body.isReadyToEat = true;
  //   } else {
  //     req.body.isReadyToEat = false;
  //   }
  //   the double bang forces the value to its boolean value
  // ex: if there is nothing, it will be false, it there is something, it will be true

  req.body.isReadyToEat = !!req.body.isReadyToEat;
  const fruit = await FruitModel.create(req.body);
  //   console.log(req.body);
//   console.log(fruit);
  res.redirect("/fruits");
});

app.get("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  const selectedFruit = await FruitModel.findById(id);
//   console.log(selectedFruit, " <-- selected fruit");
  res.render("fruits/show.ejs", { selectedFruit });
});

app.listen(3000, () => {
//   console.log("listening on port 3000");
});
