const router = require("express").Router();
const { checkStatus } = require("../database");

router.get("", async function (req, res) {
  const databaseStatus = await checkStatus();
  res.status(200).json({ response: databaseStatus });
});

module.exports = router;
