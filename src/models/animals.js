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

  static async deleteAnimal(id) {
    const key = datastore.key([kinds.ANIMALS, parseInt(id, 10)]);
    await datastore.delete(key);
  }

  static async getAnimals(cursor, searchCriteria) {
    let q = datastore.createQuery(kinds.ANIMALS).limit(PAGE_SIZE);
    q.filter("Species", "=", searchCriteria.species);

    if (searchCriteria.breed !== "All Breeds") {
      q.filter("Breed", "=", searchCriteria.breed);
    }

    // if multiple dispositions, query comes in as an array
    if (typeof searchCriteria.disposition === "object") {
      searchCriteria.disposition.forEach((e) => {
        q.filter("Disposition", "=", e);
      });
      // otherwise if only one disposition, it will be a string
    } else if (typeof searchCriteria.disposition === "string") {
      q.filter("Disposition", "=", searchCriteria.disposition);
    }

    // sort results in order of date posting was created
    if (searchCriteria.descending === "true") {
      searchCriteria.descending = true;
    } else {
      searchCriteria.descending = false;
    }

    // if previous button clicked, reverse the order of the query
    if (searchCriteria.direction === "prev") {
      searchCriteria.descending = !searchCriteria.descending;
    }

    q.order("DateCreated", { descending: searchCriteria.descending });

    // if more results than the page limit, set the cursor to the first of the next page's results
    if (cursor && cursor !== "undefined") {
      q = q.start(cursor);
    }

    const results = await datastore.runQuery(q);
    const entities = results[0];
    const info = results[1];

    // if previous button was clicked, reverse the entities
    if (searchCriteria.direction === "prev") {
      entities.reverse();
    }

    // check if more results in database and set the previous and next cursors. return results.
    const returnValue = { animals: entities.map(fromDatastore) };

    // set new previous and next button cursors depending on the direction
    if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
      if (searchCriteria.direction === "prev") {
        returnValue.prev = info.endCursor;
        returnValue.next = cursor;
      } else {
        returnValue.prev = cursor;
        returnValue.next = info.endCursor;
      }
    } else if (searchCriteria.direction === "prev") {
      returnValue.next = cursor;
    } else {
      returnValue.prev = cursor;
    }

    return returnValue;
  }

  static async getAnimalById(id) {
    const q = datastore
      .createQuery(kinds.ANIMALS)
      .limit(1)
      .filter("__key__", datastore.key([kinds.ANIMALS, parseInt(id, 10)]));

    let animal = (await datastore.runQuery(q))[0][0];
    if (typeof animal === "undefined") {
      return animal;
    }

    return new Animals(fromDatastore(animal));
  }
}

module.exports.Animals = Animals;
