const express = require("express");
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const { species } = require("../utils/species");
const { breeds } = require("../utils/breeds");
const { dispositions } = require("../utils/dispositions");
const { availability } = require("../utils/availability");
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

const bucketName = 'capstone-project-318221.appspot.com';

// A bucket is a container for objects (files).
const bucket = storage.bucket(bucketName);

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

router.post("/", multer.single('file'), async (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const filename = `${uuidv4()}.jpg`;

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(filename);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', async () => {
    // The public URL can be used to directly access the file via HTTP.
    console.log(req.body);
    req.body.DateCreated = new Date(Date.now()).toISOString();
    req.body.Availability = availability.AVAILABLE;
    req.body.Photo = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    const newAnimal = new Animals(req.body);
    await newAnimal.save();
    res.status(204).end();
  });

  blobStream.end(req.file.buffer);
});

router.delete("/:id", async (req, res) => {
  await Animals.deleteAnimal(req.params.id);
  res.status(204).end();
});

module.exports = router;
