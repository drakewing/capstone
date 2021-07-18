// Dependencies
const { Datastore } = require("@google-cloud/datastore");
const bcrypt = require("bcrypt");

const { fromDatastore } = require("../utils/db_helpers");
const kinds = require("../utils/kinds");

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
    Object.assign(this, entity);
  }

  /**
   * Saves a user to the datastore.
   */
  async save() {
    const newUser = {
      key: this[Datastore.KEY] || datastore.key(kinds.USERS),
      data: this,
    };
    await datastore.save(newUser);
    this.id = newUser.key.id;
  }

  /**
   * Sets the user's email to a new value. Doesn't do any validation.
   */
  setEmail(email) {
    this.email = email;
  }

  /**
   * Sets a password for a user by saving the hash.
   */
  async setPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    this.password = hash;
  }

  /**
   * Checks a password for correctness by comparing hashes.
   */
  async validPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  /**
   * Finds a single user based on id.  Calls "callback" with either an instance
   * of the user (on success) or undefined (on failure).
   *
   * Also returns the newly instantiated User object.
   */
  static async findById(id, callback) {
    const q = datastore
      .createQuery(kinds.USERS)
      .limit(1)
      .filter("__key__", datastore.key([kinds.USERS, parseInt(id, 10)]));

    let user = (await datastore.runQuery(q))[0][0];
    if (typeof user === "undefined") {
      callback(undefined, undefined);
      return user;
    }

    user = new User(fromDatastore(user));
    callback(undefined, user);
    return user;
  }

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
