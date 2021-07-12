const express = require("express");
const { Datastore } = require("@google-cloud/datastore");
const { fromDatastore } = require("../utils/db_helpers");
const kinds = require("../utils/kinds");

// App data
const router = express.Router();
const datastore = new Datastore();

const PAGE_SIZE = 6;

// Model Functions
async function getAnimals(cursor, searchCriteria) {
  let q = datastore.createQuery(kinds.ANIMALS).limit(PAGE_SIZE);
  q.filter('Species', '=', searchCriteria.species);

  if (searchCriteria.breed !== "Any Breed") {
    q.filter('Breed', '=', searchCriteria.breed);
  }

  if (typeof searchCriteria.disposition === 'object') {
    searchCriteria.disposition.forEach((e) => {
      q.filter('Disposition', '=', e);
    });
  } else if (typeof searchCriteria.disposition === "string") {
    q.filter('Disposition', '=', searchCriteria.disposition);
  }

  if (searchCriteria.descending === "true") {
    searchCriteria.descending = true;
  } else {
    searchCriteria.descending = false;
  }
  q.order('DateCreated', { descending: searchCriteria.descending });

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
  // loads full animals page
  let context = await getAnimals(null, { species: "Cat", breed: "Any Breed", descending: "true" });
  const species = await getSpecies();
  context = Object.assign(context, species);
  const disposition = await getDispositions();
  context = Object.assign(context, disposition);
  res.render("animals", context);
});

router.get("/partial", async (req, res) => {
  console.log(req.query);

  let cursor = null;
  // if user clicks the "next" button to see more results
  if (Object.keys(req.query).includes("cursor")) {
    cursor = req.query.cursor;
  }

  const context = await getAnimals(cursor, req.query);
  context.layout = false;
  res.render("partials/animalsgrid", context);
});

module.exports = router;
