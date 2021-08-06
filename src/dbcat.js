// initialize datastore
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

const PETS = "Pets";

const q = datastore.createQuery(PETS);

datastore.runQuery(q).then((results) => {
  const entities = results[0];
  console.log(entities);
});

datastore.runQuery(q).then((results) => {
  const entities = results[0];
  console.log(entities);
});
