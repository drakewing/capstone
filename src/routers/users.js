const express = require("express");
const { Application } = require("../models/application");

// App data
const router = express.Router();

// "User" specific routes
router.get("/", (req, res) => {
  res.sendStatus(200);
});
const bucketName = 'capstone-project-318221.appspot.com';

router.get("/:id/applications", async (req, res) => {
  console.log(req.params.id);

  const context = await Application.getApplicationsByUserId(req.params.id);
  context.layout = false; // avoid navbar in partial handlebars
  context.Bucket = `https://storage.googleapis.com/${bucketName}`;
  console.log("animals in users route:");
  console.log(context);

  res.render("partials/animalsgrid", context);
});

module.exports = router;
