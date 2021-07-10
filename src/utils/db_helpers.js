const { Datastore } = require("@google-cloud/datastore");

const fromDatastore = (item) => {
  item.id = item[Datastore.KEY].id;
  return item;
};

export { fromDatastore as default };
