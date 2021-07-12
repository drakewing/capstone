// Dependencies
const { Datastore } = require("@google-cloud/datastore");
const { fromDatastore } = require("../utils/db_helpers");
const kinds = require("../utils/kinds");
const bcrypt = require("bcrypt");

// App data
const datastore = new Datastore();
const saltRounds = 10;

/**
 * This class represents users in the application. Users will have (at least)
 * an email and password hash.
 */
class User {
  /**
   * Saves datastore entity and id as instance variables for convenience.
   *
   * Allows for empty instantiation (useful during signups).
   */
  constructor(entity) {
    if (entity) {
      this.entity = fromDatastore(entity);
    } else {
      this.entity = {};
    }
  }

  /**
   * Saves a user to the datastore.
   */
  async save() {
    const newUser = {
      key: this.entity[Datastore.KEY] || datastore.key(kinds.USERS),
      data: this.entity,
    };
    await datastore.save(newUser);
    this.entity.id = newUser.key.id;
  }

  /**
   * Sets the user's email to a new value. Doesn't do any validation.
   */
  setEmail(email) {
    this.entity.email = email;
  }

  /**
   * Sets a password for a user by saving the hash.
   */
  async setPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    this.entity.password = hash;
  }

  /**
   * Checks a password for correctness by comparing hashes.
   */
  validPassword(password) {}

  /**
   * Finds a single user based on email (supplied in options).  Calls
   * "callback" with either an instance of the user (on success) or
   * undefined (on failure).
   *
   * Also returns the newly instantiated User object.
   */
  static async findOne(options, callback) {
    const q = datastore.createQuery(kinds.USERS).limit(1);
    q.filter("email", "=", options.username);

    let user = (await datastore.runQuery(q))[0][0];
    if (typeof user === "undefined") {
      callback(undefined, undefined);
      return user;
    }

    user = new User(fromDatastore(user));
    callback(undefined, user);
    return user;
  }
}

module.exports.User = User;
