const express = require("express");

const app = express();

app.use(express.json());

app.use("/api", require("./api"));

app.listen(3003);

console.log("Running: http://localhost:3003");
