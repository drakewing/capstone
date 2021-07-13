// Dependencies
const { Datastore } = require("@google-cloud/datastore");
const { fromDatastore } = require("../utils/db_helpers");
const kinds = require("../utils/kinds");

const datastore = new Datastore();

const PAGE_SIZE = 6;

class Animals {
  constructor(obj) {
    Object.assign(this, obj);
  }

  async save() {
    const newAnimal = {
      key: this[Datastore.KEY] || datastore.key(kinds.ANIMALS),
      data: this,
    };
    await datastore.save(newAnimal);
    this.id = newAnimal.key.id;
  }

  static async getAnimals(cursor, searchCriteria) {
    let q = datastore.createQuery(kinds.ANIMALS).limit(PAGE_SIZE);
    q.filter('Species', '=', searchCriteria.species);

    if (searchCriteria.breed !== "All Breeds") {
      q.filter('Breed', '=', searchCriteria.breed);
    }

    // if multiple dispositions, query comes in as an array
    if (typeof searchCriteria.disposition === 'object') {
      searchCriteria.disposition.forEach((e) => {
        q.filter('Disposition', '=', e);
      });
      // otherwise if only one disposition, it will be a string
    } else if (typeof searchCriteria.disposition === "string") {
      q.filter('Disposition', '=', searchCriteria.disposition);
    }

    // sort results in order of date posting was created
    if (searchCriteria.descending === "true") {
      searchCriteria.descending = true;
    } else {
      searchCriteria.descending = false;
    }
    q.order('DateCreated', { descending: searchCriteria.descending });

    // if more results than the page limit, set the cursor to the first of the next page's results
    if (cursor) {
      q = q.start(cursor);
    }

    const results = await datastore.runQuery(q);
    const entities = results[0];
    const info = results[1];

    // send results in segments of PAGE_SIZE, starting where the cursor indicates
    if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
      return { pets: entities.map(fromDatastore), next: info.endCursor };
    }
    // if no results have been already sent, then send the first segment
    return { pets: entities.map(fromDatastore) };
  }
}

module.exports.Animals = Animals;
