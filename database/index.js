const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("database/snakeMilk.sqlite", function (err) {
  if (err) console.log("Failed Connect: SQLite Database");
  else console.log("Successful Connect: SQLite Database");
});

async function checkStatus() {
  return "Hello World";
}

module.exports = {
  checkStatus,
};
