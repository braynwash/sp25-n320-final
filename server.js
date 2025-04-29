const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Serve static files (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "views")));

app.use("/api", require("./api"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.listen(3003);
console.log("Running: http://localhost:3003");
