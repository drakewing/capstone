// initialize datastore
const { Datastore } = require('@google-cloud/datastore');
const kinds = require("../src/utils/kinds");

const datastore = new Datastore();

let q = datastore.createQuery(kinds.PETS);

datastore.runQuery(q).then((results) => {
  const entities = results[0];
  console.log(entities);
});

const SPECIES = "Species";

q = datastore.createQuery(SPECIES);

datastore.runQuery(q).then((results) => {
  const entities = results[0];
  console.log(entities);
});
