const express = require("express");
const { Datastore } = require("@google-cloud/datastore");
const { fromDatastore } = require("../utils/db_helpers");
const kinds = require("../utils/kinds");

// App data
const router = express.Router();
const datastore = new Datastore();

const PAGE_SIZE = 6;

// Model Functions
async function getAnimals(cursor) {
  let q = datastore.createQuery(kinds.ANIMALS).limit(PAGE_SIZE);

  if (cursor) {
    q = q.start(cursor);
  }

  const results = await datastore.runQuery(q);
  const entities = results[0];
  const info = results[1];

  // send results in segments of 30 pets starting where the cursor indicates
  if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
    return { pets: entities.map(fromDatastore), next: info.endCursor };
  }
  // if no results have been already sent, then send the first segment
  return { pets: entities.map(fromDatastore) };
}

async function getSpecies() {
  const q = datastore.createQuery(kinds.SPECIES);

  const results = await datastore.runQuery(q);
  const entities = results[0];

  // if no results have been already sent, then send the first segment
  return { species: entities.map(fromDatastore) };
}

async function getDispositions() {
  const q = datastore.createQuery(kinds.DISPOSITIONS);

  const results = await datastore.runQuery(q);
  const entities = results[0];

  // if no results have been already sent, then send the first segment
  return { dispositions: entities.map(fromDatastore) };
}

// "Animal" specific routes
router.get("/", async (req, res) => {
  // if user clicks the "next" button to see more results
  if (Object.keys(req.query).includes("cursor")) {
    const { cursor } = req.query;
    const context = await getAnimals(cursor);
    console.log(context);
    context.layout = false;
    res.render("partials/animalsgrid", context);
  } else {
    // loads full animals page
    let context = await getAnimals(null);
    const species = await getSpecies();
    context = Object.assign(context, species);
    const disposition = await getDispositions();
    context = Object.assign(context, disposition);
    res.render("animals", context);
    console.log(context);
  }
});

module.exports = router;
