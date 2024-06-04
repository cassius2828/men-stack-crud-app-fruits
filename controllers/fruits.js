const FruitModel = require("../models/fruit");

// get all fruits
const index = async (req, res) => {
  const allFruits = await FruitModel.find({});

  res.render("fruits/index.ejs", { allFruits });
};

// create a new fruit
const create = async (req, res) => {
  req.body.isReadyToEat = !!req.body.isReadyToEat;
  await FruitModel.create(req.body);

  res.redirect("/fruits");
};

// render the new fruit page
const newFruit = (req, res) => {
  res.render("fruits/new.ejs");
};

// delete fruit
const remove = async (req, res) => {
  const { id } = req.params;
  await FruitModel.deleteOne({ _id: id });
  res.redirect("/fruits");
};

// get fruit by id
const show = async (req, res) => {
  const { id } = req.params;
  const selectedFruit = await FruitModel.findById(id);

  res.render("fruits/show.ejs", { selectedFruit });
};

// show edit fruit
const showEdit = async (req, res) => {
  const { id } = req.params;
  const selectedFruit = await FruitModel.findById(id);

  res.render("fruits/edit.ejs", { selectedFruit });
};

// edit fruit
const edit = async (req, res) => {
  const { id } = req.params;
  const selectedFruitInfo = {
    name: req.body.name,
    isFruitReadyToEat: !!req.body.isFruitReadyToEat,
  };

  await FruitModel.findByIdAndUpdate(id, selectedFruitInfo);

  res.redirect("/fruits");
};

///////////////////////////
// EXPORTS
///////////////////////////

module.exports = {
  index,
  create,
  new: newFruit,
  remove,
  show,
  showEdit,
  edit,
};
