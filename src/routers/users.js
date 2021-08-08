const express = require("express");
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const { Application } = require("../models/application");
const { User } = require("../models/user");
const storageBucket = require("../utils/storageBucket");

// App data
const router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const storage = new Storage();

// A bucket is a container for objects (files).
const bucket = storage.bucket(storageBucket.NAME);

// "User" specific routes
router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/:id/applications", async (req, res) => {
  console.log(req.params.id);

  const context = await Application.getApplicationsByUserId(req.params.id);
  context.layout = false; // avoid navbar in partial handlebars
  context.Bucket = storageBucket.URL;
  console.log("animals in users route:");
  console.log(context);

  res.render("partials/animalsgrid", context);
});

router.patch("/:id", multer.single('file'), async (req, res, next) => {
  console.log("hello from patch user");
  console.log(req.body);

  if (!req.file) {
    console.log("no file uploaded");
    User.updateUser(req.params.id, req.body);
    res.status(204).end();
  } else {
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
      req.body.photo = `${blob.name}`;
      User.updateUser(req.params.id, req.body);
      res.json({ photo: `${storageBucket.NAME}/${blob.name}` });
    });

    blobStream.end(req.file.buffer);
  }
});

module.exports = router;
