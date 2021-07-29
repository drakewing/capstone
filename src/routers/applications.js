const express = require("express");
// const { Datastore } = require("@google-cloud/datastore");

// App data
const router = express.Router();
// const datastore = new Datastore();
// const PAGE_SIZE = 6;

// "Application" specific routes
router.get("/animals/:id", (req, res) => {
  console.log(req.params.id);
  res.sendStatus(200);
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
