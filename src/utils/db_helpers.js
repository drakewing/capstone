const { Datastore } = require("@google-cloud/datastore");

const fromDatastore = (item) => {
  item.id = item[Datastore.KEY].id;
  return item;
};

exports.fromDatastore = fromDatastore;
