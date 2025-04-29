const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("database/snakeMilk.sqlite", function (err) {
  if (err) console.log("Failed Connect: SQLite Database");
  else console.log("Successful Connect: SQLite Database");
});

async function checkStatus() {
  return "API Connected";
}

// -==================================================-
// Leading Companies Operations

// get all
async function getAllLeadingCompanies() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM leadingCompanies;`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// get by id
async function getLeadingCompaniesById(companyId) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM leadingCompanies WHERE companyId = ${companyId};`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// add row
async function addNewCompany(companyData = {}) {
  return new Promise((resolve, reject) => {
    console.log(companyData);

    if (!companyData.name || !companyData.litersPerYear) {
      reject("Company must have a name AND production rate in liters per year");
    }
    db.run(
      `INSERT INTO leadingCompanies (name, litersPerYear) VALUES (${companyData.name}, ${companyData.litersPerYear});`,
      function (err) {
        if (err) reject(err);
        else resolve("Company Added Successfully");
      }
    );
  });
}

// -==================================================-
// Top Snake Milker Operations

// get all
async function getAllTopSnakeMilkers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM topSnakeMilkers;`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// get by id
async function getSnakeMilkersById(snakeMilkerId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM topSnakeMilkers WHERE snakeMilkerId = ${snakeMilkerId};`,
      function (err, rows) {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

// add row
async function addNewSnakeMilker(snakeMilkerData = {}) {
  return new Promise((resolve, reject) => {
    if (!snakeMilkerData.name || !snakeMilkerData.safetyRating || !snakeMilkerData.hoursCommitted)
      reject("Snake Milker Data is not complete. Missing name or safety rating or hours committed");
    db.run(
      `INSERT INTO topSnakeMilkers (name, safetyRating, hoursCommitted) VALUES (${snakeMilkerData.name}, ${snakeMilkerData.safetyRating}, ${snakeMilkerData.hoursCommitted});`,
      function (err) {
        if (err) reject(err);
        else resolve("Added Snake Milker");
      }
    );
  });
}

// -==================================================-
// Snake Statistics Operations

// get all
async function getAllSnakeStatistics() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM snakeStatistics;`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// get by id
async function getSnakeStatisticsById(snakeId) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM snakeStatistics WHERE snakeId = ${snakeId};`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// add row
async function addNewSnakeStatistic(snakeData = {}) {
  return new Promise((resolve, reject) => {
    if (!snakeData.name || !snakeData.binomialName || !snakeData.venomType)
      reject("Snake Data is not complete. Missing name or binomial name or venom data.");
    db.run(
      `INSERT INTO snakeStatistics (name, binomialName, venomType) VALUES (${snakeData.name}, ${snakeData.binomialName}, ${snakeData.venomType});`,
      function (err) {
        if (err) reject(err);
        else resolve("Added Snake Statistic");
      }
    );
  });
}

// -==================================================-
// Snake Shop Operations

// get all
async function getAllSnakeShop() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM snakeShop;`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// get by id
async function getSnakeShopById(shopId) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM snakeShop WHERE shopId = ${shopId};`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// add row
async function addNewSnakeShop(shopData = {}) {
  return new Promise((resolve, reject) => {
    if (!shopData.name || !shopData.category || !shopData.price)
      reject("Shop data is not complete. Missing name or category or price.");
    db.run(
      `INSERT INTO snakeShop (name, category, price) VALUES (${shopData.name}, ${shopData.category}, ${shopData.price});`,
      function (err) {
        if (err) reject(err);
        else resolve("Added Shop Item");
      }
    );
  });
}

// -==================================================-
module.exports = {
  checkStatus,
  getAllLeadingCompanies,
  getLeadingCompaniesById,
  addNewCompany,
  getAllTopSnakeMilkers,
  getSnakeMilkersById,
  addNewSnakeMilker,
  getAllSnakeStatistics,
  getSnakeStatisticsById,
  addNewSnakeStatistic,
  getAllSnakeShop,
  getSnakeShopById,
  addNewSnakeShop,
};
