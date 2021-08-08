const express = require("express");
const Multer = require('multer');
const { Application } = require("../models/application");
const { User } = require("../models/user");

// App data
const router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

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

router.patch("/:id", multer.none(), async (req, res) => {
  console.log("hello from patch user");
  console.log(req.body);
  User.updateUser(req.params.id, req.body);
  res.sendStatus(200);
});

module.exports = router;
