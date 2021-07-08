const express = require("express");
const { Datastore } = require("@google-cloud/datastore");
const { fromDatastore } = require("../utils/db_helpers");

// App data
const router = express.Router();
const datastore = new Datastore();
const PETS = "Pets";
const PAGE_SIZE = 6;

// Model Functions
async function getPets(page) {
  let q = datastore.createQuery(PETS).limit(PAGE_SIZE);
  let next = 1;

  // Request specified a page, make sure it's >= 0
  if (typeof page !== "undefined") {
    let pageInt = parseInt(page, 10);
    pageInt = pageInt >= 0 ? pageInt : 0;
    next = pageInt + 1;
    q = q.offset(pageInt * PAGE_SIZE);
  }

  return datastore.runQuery(q).then((results) => {
    const entities = results[0];

    // Send results in segments of 6 pets starting with the requested page
    return { pets: entities.map(fromDatastore), next };
  });
}

// "Animal" specific routes
router.get("/", async (req, res) => {
  const pets = await getPets(req.query.page);
  res.render("animals", pets);
});

module.exports = router;
