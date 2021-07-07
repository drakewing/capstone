const express = require("express");
const { Datastore } = require("@google-cloud/datastore");
const { fromDatastore } = require("../utils/db_helpers");

// App data
const router = express.Router();
const datastore = new Datastore();
const PETS = "Pets";
const PAGE_SIZE = 6;

// Model Functions
async function getPets(cursor) {
  let q = datastore.createQuery(PETS).limit(PAGE_SIZE);

  if (cursor) {
    q = q.start(cursor);
  }

  return datastore.runQuery(q).then((results) => {
    const entities = results[0];
    const info = results[1];

    // send results in segments of 30 pets starting where the cursor indicates
    if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
      return { pets: entities.map(fromDatastore), next: info.endCursor };
    }
    // if no results have been already sent, then send the first segment
    return { pets: entities.map(fromDatastore) };
  });
}

// "Animal" specific routes
router.get("/", async (req, res) => {
  // if user clicks the "next" button to see more results
  if (Object.keys(req.query).includes("cursor")) {
    const { cursor } = req.query;
    let context = await getPets(cursor)
    console.log(context);
    context.layout = false;
    res.render("partials/animalsgrid", context);
  } else {
    // loads full animals page
    //let breedList = getBreeds();
    let context = await getPets(null)
    //context.breadList = breedList;
    console.log(context);
    res.render("animals", context);
  }
});

module.exports = router;
