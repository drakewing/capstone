// Dependencies
const { Datastore } = require("@google-cloud/datastore");
const { fromDatastore } = require("../utils/db_helpers");
const kinds = require("../utils/kinds");

const datastore = new Datastore();

class Application {
  constructor(obj) {
    Object.assign(this, obj);
  }

  async save() {
    const newApplication = {
      key: this[Datastore.KEY] || datastore.key(kinds.APPLICATIONS),
      data: this,
    };
    await datastore.save(newApplication);
    this.id = newApplication.key.id;
  }

  static async deleteApplication(id) {
    const key = datastore.key([kinds.APPLICATIONS, parseInt(id, 10)]);
    await datastore.delete(key);
  }

  static async getApplicationById(id) {
    const q = datastore
      .createQuery(kinds.APPLICATIONS)
      .limit(1)
      .filter("__key__", datastore.key([kinds.APPLICATIONS, parseInt(id, 10)]));

    const application = (await datastore.runQuery(q))[0][0];
    if (typeof application === "undefined") {
      return application;
    }

    return new Application(fromDatastore(application));
  }

  static async getApplicationByAnimalID(animalID) {
    const q = datastore
      .createQuery(kinds.APPLICATIONS)
      .filter("animalID", "=", animalID)
      .limit(1);

    const application = (await datastore.runQuery(q))[0][0];
    if (typeof application === "undefined") {
      return application;
    }

    return new Application(fromDatastore(application));
  }
}

module.exports.Application = Application;
