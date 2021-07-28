const express = require("express");
const { Datastore } = require("@google-cloud/datastore");
const { Animals } = require("../models/animals");

// App data
const router = express.Router();
const datastore = new Datastore();

// "Application" specific routes
router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/animals/:animalId", async (req, res) => {
  // Check for valid animal ID
  if (!req.params.animalId) {
    res.status(404).render("404");
    return;
  }

  animalId = parseInt(req.params.animalId, 10);

  const animal = await Animals.getAnimalById(req.params.animalId);
  if (typeof animal === "undefined") {
    res.status(404).render("404");
    return;
  }

  console.log(animal);
  res.send("you got here");
});

module.exports = router;
