const router = require("express").Router();
const { response } = require("express");
const {
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
  deleteCompany,
  deleteSnakeMilker,
  deleteSnakeShop,
  deleteSnakeStatistic,
  updateSnakeStatistic
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
  try {
    const response = await addNewCompany({
      name: req.query.companyName,
      litersPerYear: parseInt(req.query.litersPerYear),
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(406).json({ error: error.toString() });
  }
});
router.get("/leadingCompanies/delete", async function (req, res) {
  try {
    const response = await deleteCompany(req.query.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(406).json({ error: error.toString() });
  }
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
  try {
    const response = await addNewSnakeMilker({
      name: req.query.name,
      safetyRating: req.query.safetyRating,
      hoursCommitted: parseInt(req.query.hoursCommitted),
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(406).json({ error: error.toString() });
  }
});
router.get("/milkers/delete", async function (req, res) {
  try {
    const response = await deleteSnakeMilker(req.query.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(406).json({ error: error.toString() });
  }
});
router.get("/milkers/:id", async function (req, res) {
  const milkerId = req.params.id;
  const response = await getSnakeMilkersById(milkerId);
  res.status(200).json({ response });
});

router.get("/statistics", async function (req, res) {
  try {
    const response = await getAllSnakeStatistics();
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/statistics/add", async function (req, res) {
  const { name, binomialName, venomType, danger, rating, image, editable } = req.body;

  try {
    const result = await addNewSnakeStatistic({
      name,
      binomialName,
      venomType,
      danger,
      rating,
      image,
      editable
    });

    res.status(200).json({ message: "Snake added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/statistics/delete", async function (req, res) {
  const snakeId = req.query.id;

  if (!snakeId) {
    return res.status(400).json({ error: "Snake ID is required" });
  }

  try {
    const response = await deleteSnakeStatistic(snakeId);
    res.status(200).json({ message: response });  
  } catch (error) {
    res.status(500).json({ error: error.toString() }); 
  }
});
router.get("/statistics/:id", async function (req, res) {
  const statisticId = req.params.id;
  const response = await getSnakeStatisticsById(statisticId);
  res.status(200).json({ response });
});
router.put("/statistics/edit/:id", async function (req, res) {
  const snakeId = req.params.id; 
  const { name, binomialName, venomType, danger, rating, image, editable } = req.body;

  try {
    const result = await updateSnakeStatistic(snakeId, {
      name,
      binomialName,
      venomType,
      danger,
      rating,
      image,
      editable
    });

    res.status(200).json({ message: "Snake updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/snakeShop", async function (req, res) {
  const response = await getAllSnakeShop();
  res.status(200).json({ response });
});
router.get("/snakeShop/add", async function (req, res) {
  try {
    const response = await addNewSnakeShop({
      name: req.query.companyName,
      company: req.query.company,
      price: parseInt(req.query.price),
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(406).json({ error: error.toString() });
  }
});
router.get("/snakeShop/delete", async function (req, res) {
  try {
    const response = await deleteSnakeShop(req.query.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(406).json({ error: error.toString() });
  }
});
router.get("/snakeShop/:id", async function (req, res) {
  const shopId = req.params.id;
  const response = await getSnakeShopById(shopId);
  res.status(200).json({ response });
});


module.exports = router;
