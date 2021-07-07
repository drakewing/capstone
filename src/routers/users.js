const express = require("express");
// const { Datastore } = require("@google-cloud/datastore");

// App data
const router = express.Router();
// const datastore = new Datastore();
// const PAGE_SIZE = 6;

// "User" specific routes
router.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
