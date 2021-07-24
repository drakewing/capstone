const express = require("express");
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { species } = require("../utils/species");
const { breeds } = require("../utils/breeds");
const { dispositions } = require("../utils/dispositions");
const { Animals } = require("../models/animals");

const router = express.Router();

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const storage = new Storage();

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

router.post("/", multer.none(), async (req, res) => {
  console.log(req.body);
  const newAnimal = new Animals(req.body);
  await newAnimal.save();
  res.status(204).end();
});

router.delete("/:id", async (req, res) => {
  await Animals.deleteAnimal(req.params.id);
  res.status(204).end();
});

module.exports = router;
