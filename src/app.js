const PETS = 'Pets';
const PAGE_SIZE = 6;

// Dependencies
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const { Datastore } = require('@google-cloud/datastore');

// App data
const PORT = process.env.PORT || 8080;
const app = express();

// handlebars template engine
app.engine('handlebars', exphbs({
  partialsDir: path.join(__dirname, '/views/partials/'),
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database
const datastore = new Datastore();

function fromDatastore(item) {
  item.id = item[Datastore.KEY].id;
  return item;
}

// Model Functions
async function getPets(cursor) {
  let q = datastore.createQuery(PETS)
    .limit(PAGE_SIZE);

  if (cursor) {
    q = q.start(cursor);
  }

  return datastore.runQuery(q).then((results) => {
    const entities = results[0];
    const info = results[1];

    // send results in segments of 30 pets starting where the cursor indicates
    if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
      return { pets: entities.map(fromDatastore), next: info.endCursor };
    }
    // if no results have been already sent, then send the first segment
    return { pets: entities.map(fromDatastore) };
  });
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/animals", async (req, res) => {
  // if user clicks the "next" button to see more results
  if (Object.keys(req.query).includes("cursor")) {
    const { cursor } = req.query;
    let context = await getPets(cursor)
    console.log(context);
    context.layout = false;
    res.render("partials/animalsgrid", context);
  } else {
    // loads full animals page
    //let breedList = getBreeds();
    let context = await getPets(null)
    //context.breadList = breedList;
    console.log(context);
    res.render("animals", context);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
  console.log("Press Ctrl+C to quit");
});
