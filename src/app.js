const PETS = 'Pets';
const PAGE_SIZE = 30;

// Dependencies
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();

// App data
const PORT = process.env.PORT || 8080;
const app = express();

// handlebars template engine
app.engine('handlebars', exphbs({
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function fromDatastore(item){
  item.id = item[Datastore.KEY].id;
  return item;
}

//Model Functions
function get_pets(cursor){
  console.log("Hello from get_pets");
  let q = datastore.createQuery(PETS)
  .limit(PAGE_SIZE);

  if (cursor) {
    q = q.start(cursor);
  }

  return datastore.runQuery(q).then( (results) => {

    const entities = results[0];
    const info = results[1];

    //send results in segments of 30 pets starting where the cursor indicates
    if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
        return {pets: entities.map(fromDatastore), next: info.endCursor};
    }
    else {
        //if no results have been already sent, then send the first segment
        return {pets: entities.map(fromDatastore)};
    }
  });
}


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/search", (req, res) => {
  let cursor = null
   get_pets(cursor).then( (petInventory) => {
    console.log("get_pets finished. petInventory:");
    console.log(petInventory);
    res.render("search", petInventory);
   });
});

// /searchnext?cursor=tftvythbuhnbygftrfc
app.get("/searchnext", (req, res) => {
  if(Object.keys(req.query).includes("cursor")){
    cursor = req.query.cursor;
    get_pets(cursor).then( (petInventory) => {
      console.log("get_pets finished. petInventory:");
      console.log(petInventory);
      res.render("searchgrid", petInventory);
     });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
  console.log("Press Ctrl+C to quit");
});
