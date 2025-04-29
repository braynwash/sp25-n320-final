const router = require("express").Router();
const {
  checkStatus,
  getAllLeadingCompanies,
  getLeadingCompaniesById,
  getAllTopSnakeMilkers,
  getSnakeMilkersById,
  getAllSnakeStatistics,
  getSnakeStatisticsById,
  getAllSnakeShop,
  getSnakeShopById,
} = require("../database");

router.get("", async function (req, res) {
  const databaseStatus = await checkStatus();
  res.status(200).json({ response: databaseStatus });
});

router.get("/leadingCompanies", async function (req, res) {
  const response = await getAllLeadingCompanies();
  res.status(200).json({ response });
});
router.get("/leadingCompanies/add", async function (req, res) {
  if (req.body == undefined) {
    res.status(418).json(["ERROR 418", "Request body is empty. Also, I'm a teapot"]);
    return;
  }
  res.status(501).json("Error 501: Not Implemented");
});
router.get("/leadingCompanies/:id", async function (req, res) {
  const companyId = req.params.id;
  const response = await getLeadingCompaniesById(companyId);
  res.status(200).json({ response });
});
router.get("/milkers", async function (req, res) {
  const response = await getAllTopSnakeMilkers();
  res.status(200).json({ response });
});
router.get("/milkers/add", async function (req, res) {
  if (req.body == undefined) {
    res.status(418).json(["ERROR 418", "Request body is empty. Also, I'm a teapot"]);
    return;
  }
  res.status(501).json("Error 501: Not Implemented");
});
router.get("/milkers/:id", async function (req, res) {
  const milkerId = req.params.id;
  const response = await getSnakeMilkersById(milkerId);
  res.status(200).json({ response });
});

router.get("/statistics", async function (req, res) {
  const response = await getAllSnakeStatistics();
  res.status(200).json({ response });
});
router.get("/statistics/add", async function (req, res) {
  if (req.body == undefined) {
    res.status(418).json(["ERROR 418", "Request body is empty. Also, I'm a teapot"]);
  }
  res.status(501).json("Error 501: Not Implemented");
  return;
});
router.get("/statistics/:id", async function (req, res) {
  const statisticId = req.params.id;
  const response = await getSnakeStatisticsById(statisticId);
  res.status(200).json({ response });
});
router.get("/snakeShop", async function (req, res) {
  const response = await getAllSnakeShop();
  res.status(200).json({ response });
});
router.get("/snakeShop/add", async function (req, res) {
  if (req.body == undefined) {
    res.status(418).json(["ERROR 418", "Request body is empty. Also, I'm a teapot"]);
    return;
  }
  res.status(501).json("Error 501: Not Implemented");
});
router.get("/snakeShop/:id", async function (req, res) {
  const shopId = req.params.id;
  const response = await getSnakeShopById(shopId);
  res.status(200).json({ response });
});

module.exports = router;
