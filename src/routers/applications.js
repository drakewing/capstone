const express = require("express");
const { Datastore } = require("@google-cloud/datastore");
const { Animals } = require("../models/animals");
const { Application } = require("../models/application");
const { User } = require("../models/user");
const { availability } = require("../utils/availability");

// App data
const router = express.Router();
const datastore = new Datastore();

// "Application" specific routes
router.get("/animals/:id", (req, res) => {
  res.sendStatus(200);
});

router.post("/", async (req, res) => {
  const animal = await Animals.getAnimalById(req.body.animalId);

  // Check that animal exists
  if (typeof animal === "undefined") {
    res.status(404).render("404");
    return;
  }

  // Check that animal is ready to be adopted
  if (!animal.isAvailable()) {
    res.status(401).render("401");
    return;
  }

  // Check that user id is valid and matches the logged in user
  const user = await User.findById(req.body.userID, () => {});

  if (typeof user === "undefined") {
    res.status(404).render("404");
    return;
  }

  if (user.id !== req.body.userID || user.id !== req.user.id) {
    res.status(401).render("401");
    return;
  }

  // Create application and update animal
  const application = new Application();
  application.userID = user.id;
  application.animalID = req.body.animalId;
  application.dateSubmitted = new Date();
  await application.save();

  animal.Availability = availability.PENDING;
  await animal.save();

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
