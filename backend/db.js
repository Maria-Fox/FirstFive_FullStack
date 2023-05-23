const {Client} = require("pg");
let {getApproporiateDBURI} = require("./config");

let db;

if(process.env.NODE_ENV === "production"){
  db = new Client({connectionString :getApproporiateDBURI(),
  ssl: {
    rejectUnauthorized: false
  }})
} else {
  // will return URI based on whether it's in test or not.
  db = new Client({
    connectionString : getApproporiateDBURI()
  });
};

db.connect();

// establish & export connection
module.exports = db;