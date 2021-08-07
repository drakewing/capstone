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

  static async getApplications() {
    const q = datastore.createQuery(kinds.APPLICATIONS);
    const applicationsRaw = (await datastore.runQuery(q))[0];
    const applications = [];

    if (typeof applicationsRaw === "undefined") {
      return applications;
    }

    if (!Array.isArray(applicationsRaw)) {
      applications.push(applicationsRaw);
      return applications;
    }

    return applicationsRaw.map((app) => new Application(fromDatastore(app)));
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

  // get all pending applications associated with user
  static async getApplicationsByUserId(userID) {
    const q = datastore
      .createQuery(kinds.APPLICATIONS)
      .filter("userID", "=", userID);
    const results = (await datastore.runQuery(q))[0];
    if (typeof results === "undefined") {
      return results;
    }

    // get animal information associated with each application
    const keys = results.map((e) => datastore.key([kinds.ANIMALS, parseInt(e.animalID, 10)]));
    let animals = [];
    if (keys.length !== 0) {
      [animals] = await datastore.get(keys);
    }
    return { animals: animals.map(fromDatastore) };
  }
}

module.exports.Application = Application;
