const express = require("express");
const { Animals } = require("../models/animals");
const { Application } = require("../models/application");
const { User } = require("../models/user");
const { availability } = require("../utils/availability");

// App data
const router = express.Router();

// "Application" specific routes
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

router.get("/animals/:animalID", async (req, res) => {
  // Check for valid animal ID
  if (!req.params.animalID) {
    res.status(404).render("404");
    return;
  }

  const animal = await Animals.getAnimalById(req.params.animalID);
  if (
    typeof animal === "undefined" ||
    animal.Availability !== availability.PENDING
  ) {
    console.log(animal);
    res.status(404).render("404");
    return;
  }

  // Confirm application exists
  const application = await Application.getApplicationByAnimalID(
    req.params.animalID
  );
  if (typeof application === "undefined") {
    res.status(404).render("404");
    return;
  }

  // Get user
  const user = await User.findById(application.userID, () => {});

  console.log(animal);
  console.log(user);

  const context = {
    animalName: animal.Name,
    animalID: animal.id,
    applicationID: application.id,
    userID: user.id,
    userName: user.Name,
    userEmail: user.email,
  };

  res.status(200).render("application", context);
});

router.post("/animals/:animalID/approve", async (req, res) => {
  // Check for valid animal ID
  if (!req.params.animalID) {
    res.status(404).render("404");
    return;
  }

  const animal = await Animals.getAnimalById(req.params.animalID);
  if (
    typeof animal === "undefined" ||
    animal.Availability !== availability.PENDING
  ) {
    console.log(animal);
    res.status(404).render("404");
    return;
  }

  // Confirm application exists
  const application = await Application.getApplicationByAnimalID(
    req.params.animalID
  );
  if (typeof application === "undefined") {
    res.status(404).render("404");
    return;
  }

  animal.Availability = availability.ADOPTED;
  animal.save();

  Application.deleteApplication(application.id);
  res.redirect("/animals");
});

router.post("/animals/:animalID/reject", async (req, res) => {
  // Check for valid animal ID
  if (!req.params.animalID) {
    res.status(404).render("404");
    return;
  }

  const animal = await Animals.getAnimalById(req.params.animalID);
  if (
    typeof animal === "undefined" ||
    animal.Availability !== availability.PENDING
  ) {
    console.log(animal);
    res.status(404).render("404");
    return;
  }

  // Confirm application exists
  const application = await Application.getApplicationByAnimalID(
    req.params.animalID
  );
  if (typeof application === "undefined") {
    res.status(404).render("404");
    return;
  }

  animal.Availability = availability.AVAILABLE;
  animal.save();

  Application.deleteApplication(application.id);
  res.redirect("/animals");
});

module.exports = router;
