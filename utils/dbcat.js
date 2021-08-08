// initialize datastore
const { Datastore } = require('@google-cloud/datastore');
const kinds = require("../src/utils/kinds");

const datastore = new Datastore();

let q = datastore.createQuery(kinds.ANIMALS)
  .order('DateCreated', { descending: true });

datastore.runQuery(q).then((results) => {
  const entities = results[0];
  console.log(entities);
});

q = datastore.createQuery(kinds.SPECIES);

datastore.runQuery(q).then((results) => {
  const entities = results[0];
  console.log(entities);
});

q = datastore.createQuery(kinds.USERS);

datastore.runQuery(q).then((results) => {
  const entities = results[0];
  console.log(entities);
});
