const express = require("express");
const { species } = require("../utils/species");
const { breeds } = require("../utils/breeds");
const { dispositions } = require("../utils/dispositions");
const { Animals } = require("../models/animals");

const router = express.Router();

router.get("/", async (req, res) => {
  // loads full animals page
  const context = await Animals.getAnimals(null, {
    species: "Dog",
    breed: "All Breeds",
    descending: "true"
  });
  context.species = species;
  context.breeds = breeds;
  context.dispositions = dispositions;
  res.render("animals", context);
});

router.get("/partial", async (req, res) => {
  console.log(req.query);
  // loads partial animals page
  let cursor = null;
  if (Object.keys(req.query).includes("cursor")) {
    cursor = req.query.cursor;
  }
  const context = await Animals.getAnimals(cursor, req.query);
  context.layout = false;
  console.log(context);
  res.render("partials/animalsgrid", context);
});

router.post("/", async (req, res) => {
  const newAnimal = new Animals(req.body);
  await newAnimal.save();

  res.status(204);
});

module.exports = router;
